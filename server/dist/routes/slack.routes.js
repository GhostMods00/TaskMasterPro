"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slack_controller_1 = require("../controllers/slack.controller");
const slack_webhook_1 = require("../webhooks/slack.webhook");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/connect', auth_1.authMiddleware, slack_controller_1.connectSlack);
router.get('/oauth/callback', slack_controller_1.handleOAuthCallback);
router.get('/channels', auth_1.authMiddleware, slack_controller_1.getChannels);
router.put('/config', auth_1.authMiddleware, slack_controller_1.updateConfig);
router.post('/events', slack_webhook_1.handleSlackEvents);
exports.default = router;
//# sourceMappingURL=slack.routes.js.map