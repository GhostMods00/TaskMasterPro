"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = exports.getChannels = exports.handleOAuthCallback = exports.connectSlack = void 0;
const web_api_1 = require("@slack/web-api");
const events_api_1 = require("@slack/events-api");
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const slackClient = new web_api_1.WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = (0, events_api_1.createEventAdapter)(process.env.SLACK_SIGNING_SECRET);
const connectSlack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        const state = `project_${projectId}`;
        const authUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=channels:read,chat:write,incoming-webhook&state=${state}`;
        res.json({ authUrl });
    }
    catch (error) {
        console.error('Error generating Slack auth URL:', error);
        res.status(500).json({ message: 'Error connecting to Slack' });
    }
});
exports.connectSlack = connectSlack;
const handleOAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { code, state } = req.query;
        const projectId = state === null || state === void 0 ? void 0 : state.toString().split('_')[1];
        const result = yield slackClient.oauth.v2.access({
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: code
        });
        yield database_1.sequelize.query(`
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
                workspaceId: (_a = result.team) === null || _a === void 0 ? void 0 : _a.id,
                channelId: (_b = result.incoming_webhook) === null || _b === void 0 ? void 0 : _b.channel_id
            },
            type: sequelize_1.QueryTypes.INSERT
        });
        res.redirect('/integration-success');
    }
    catch (error) {
        console.error('Error handling Slack OAuth:', error);
        res.redirect('/integration-error');
    }
});
exports.handleOAuthCallback = handleOAuthCallback;
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const projectId = req.params.projectId;
        const [integration] = yield database_1.sequelize.query(`
      SELECT access_token FROM slack_integrations 
      WHERE project_id = :projectId
    `, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!integration) {
            return res.status(404).json({ message: 'Slack integration not found' });
        }
        const result = yield slackClient.conversations.list({
            token: integration.access_token,
            types: 'public_channel,private_channel'
        });
        const channels = (_a = result.channels) === null || _a === void 0 ? void 0 : _a.map(channel => ({
            id: channel.id,
            name: channel.name
        }));
        res.json({ channels });
    }
    catch (error) {
        console.error('Error fetching Slack channels:', error);
        res.status(500).json({ message: 'Error fetching channels' });
    }
});
exports.getChannels = getChannels;
const updateConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        const { channel, notifications } = req.body;
        yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.UPDATE
        });
        res.json({ message: 'Configuration updated' });
    }
    catch (error) {
        console.error('Error updating Slack config:', error);
        res.status(500).json({ message: 'Error updating configuration' });
    }
});
exports.updateConfig = updateConfig;
//# sourceMappingURL=slack.controller.js.map