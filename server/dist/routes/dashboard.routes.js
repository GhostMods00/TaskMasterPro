"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/stats', auth_1.authMiddleware, dashboard_controller_1.getDashboardStats);
router.get('/recent-activity', auth_1.authMiddleware, dashboard_controller_1.getRecentActivity);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map