// server/src/controllers/slack.controller.ts
import { Request, Response } from 'express';
import { WebClient } from '@slack/web-api';
import { createEventAdapter } from '@slack/events-api';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

// Initialize Slack clients
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

export const connectSlack = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    // Generate state parameter to prevent CSRF
    const state = `project_${projectId}`;
    
    // Generate Slack OAuth URL
    const authUrl = `https://slack.com/oauth/v2/authorize?client_id=${
      process.env.SLACK_CLIENT_ID
    }&scope=channels:read,chat:write,incoming-webhook&state=${state}`;

    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating Slack auth URL:', error);
    res.status(500).json({ message: 'Error connecting to Slack' });
  }
};

export const handleOAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    const projectId = state?.toString().split('_')[1];

    // Exchange code for access token
    const result = await slackClient.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code: code as string
    });

    // Store the access token and workspace info
    await sequelize.query(`
      INSERT INTO slack_integrations (
        project_id, 
        access_token, 
        workspace_id, 
        channel_id
      ) VALUES (
        :projectId, 
        :accessToken, 
        :workspaceId, 
        :channelId
      )
      ON CONFLICT (project_id) 
      DO UPDATE SET 
        access_token = EXCLUDED.access_token,
        workspace_id = EXCLUDED.workspace_id,
        channel_id = EXCLUDED.channel_id
    `, {
      replacements: {
        projectId,
        accessToken: result.access_token,
        workspaceId: result.team?.id,
        channelId: result.incoming_webhook?.channel_id
      },
      type: QueryTypes.INSERT
    });

    res.redirect('/integration-success');
  } catch (error) {
    console.error('Error handling Slack OAuth:', error);
    res.redirect('/integration-error');
  }
};

export const getChannels = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;

    // Get project's Slack token
    const [integration] = await sequelize.query(`
      SELECT access_token FROM slack_integrations 
      WHERE project_id = :projectId
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    if (!integration) {
      return res.status(404).json({ message: 'Slack integration not found' });
    }

    // Get channels list from Slack
    const result = await slackClient.conversations.list({
      token: integration.access_token,
      types: 'public_channel,private_channel'
    });

    const channels = result.channels?.map(channel => ({
      id: channel.id,
      name: channel.name
    }));

    res.json({ channels });
  } catch (error) {
    console.error('Error fetching Slack channels:', error);
    res.status(500).json({ message: 'Error fetching channels' });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const { channel, notifications } = req.body;

    await sequelize.query(`
      UPDATE slack_integrations 
      SET channel = :channel, 
          notifications = :notifications
      WHERE project_id = :projectId
    `, {
      replacements: {
        projectId,
        channel,
        notifications: JSON.stringify(notifications)
      },
      type: QueryTypes.UPDATE
    });

    res.json({ message: 'Configuration updated' });
  } catch (error) {
    console.error('Error updating Slack config:', error);
    res.status(500).json({ message: 'Error updating configuration' });
  }
};