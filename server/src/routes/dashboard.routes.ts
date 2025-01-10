// src/routes/dashboard.routes.ts
import { Router } from 'express';
import { getDashboardStats, getRecentActivity } from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/stats', authMiddleware, getDashboardStats);
router.get('/recent-activity', authMiddleware, getRecentActivity);

export default router;