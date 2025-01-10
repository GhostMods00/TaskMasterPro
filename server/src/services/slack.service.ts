// server/src/services/slack.service.ts
import { WebClient } from '@slack/web-api';
import { sequelize } from '../config/database';
import { QueryTypes } from 'sequelize';

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export const sendTaskUpdate = async (projectId: number, task: any) => {
  try {
    const [integration] = await sequelize.query(`
      SELECT * FROM slack_integrations 
      WHERE project_id = :projectId AND notifications->>'taskUpdates' = 'true'
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    if (!integration) return;

    await slackClient.chat.postMessage({
      channel: integration.channel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Task Update:* ${task.title}`
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Status:* ${task.status}`
            },
            {
              type: 'mrkdwn',
              text: `*Assigned to:* ${task.assignee}`
            }
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Error sending Slack task update:', error);
  }
};

export const sendDailyDigest = async (projectId: number) => {
  try {
    const [integration] = await sequelize.query(`
      SELECT * FROM slack_integrations 
      WHERE project_id = :projectId AND notifications->>'dailyDigest' = 'true'
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    if (!integration) return;

    // Get project stats
    const [stats] = await sequelize.query(`
      SELECT 
        COUNT(CASE WHEN status = 'completed' AND updated_at > NOW() - INTERVAL '1 day' 
              THEN 1 END) as completed_today,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 day' 
              THEN 1 END) as created_today
      FROM tasks
      WHERE project_id = :projectId
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    await slackClient.chat.postMessage({
      channel: integration.channel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Daily Project Digest*'
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Tasks Completed Today:* ${stats.completed_today}`
            },
            {
              type: 'mrkdwn',
              text: `*New Tasks Today:* ${stats.created_today}`
            }
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Error sending Slack daily digest:', error);
  }
};