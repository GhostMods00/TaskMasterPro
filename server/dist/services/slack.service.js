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
exports.sendDailyDigest = exports.sendTaskUpdate = void 0;
const web_api_1 = require("@slack/web-api");
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const slackClient = new web_api_1.WebClient(process.env.SLACK_BOT_TOKEN);
const sendTaskUpdate = (projectId, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [integration] = yield database_1.sequelize.query(`
      SELECT * FROM slack_integrations 
      WHERE project_id = :projectId AND notifications->>'taskUpdates' = 'true'
    `, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!integration)
            return;
        yield slackClient.chat.postMessage({
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
    }
    catch (error) {
        console.error('Error sending Slack task update:', error);
    }
});
exports.sendTaskUpdate = sendTaskUpdate;
const sendDailyDigest = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [integration] = yield database_1.sequelize.query(`
      SELECT * FROM slack_integrations 
      WHERE project_id = :projectId AND notifications->>'dailyDigest' = 'true'
    `, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!integration)
            return;
        const [stats] = yield database_1.sequelize.query(`
      SELECT 
        COUNT(CASE WHEN status = 'completed' AND updated_at > NOW() - INTERVAL '1 day' 
              THEN 1 END) as completed_today,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 day' 
              THEN 1 END) as created_today
      FROM tasks
      WHERE project_id = :projectId
    `, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT
        });
        yield slackClient.chat.postMessage({
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
    }
    catch (error) {
        console.error('Error sending Slack daily digest:', error);
    }
});
exports.sendDailyDigest = sendDailyDigest;
//# sourceMappingURL=slack.service.js.map