// server/src/controllers/project-analytics.controller.ts
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const getProjectAnalytics = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.id;

    // Project Overview Stats
    const [projectStats] = await sequelize.query(`
      SELECT 
        p.*,
        COUNT(DISTINCT t.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks,
        COUNT(DISTINCT pm.user_id) as team_size,
        SUM(tl.hours_logged) as total_hours_logged,
        AVG(CASE WHEN t.status = 'completed' THEN 
          EXTRACT(EPOCH FROM (t.updated_at - t.created_at))/3600 
        END) as avg_completion_time
      FROM projects p
      LEFT JOIN tasks t ON p.id = t.project_id
      LEFT JOIN project_members pm ON p.id = pm.project_id
      LEFT JOIN time_logs tl ON t.id = tl.task_id
      WHERE p.id = :projectId AND (p.owner_id = :userId OR pm.user_id = :userId)
      GROUP BY p.id
    `, {
      replacements: { projectId, userId },
      type: QueryTypes.SELECT
    });

    // Task Status Distribution
    const taskDistribution = await sequelize.query(`
      SELECT 
        status,
        COUNT(*) as count,
        COUNT(*)::float / SUM(COUNT(*)) OVER () * 100 as percentage
      FROM tasks
      WHERE project_id = :projectId
      GROUP BY status
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    // Time Tracking Analysis
    const timeTracking = await sequelize.query(`
      SELECT 
        u.username,
        SUM(tl.hours_logged) as total_hours,
        COUNT(DISTINCT t.id) as tasks_worked_on
      FROM time_logs tl
      JOIN tasks t ON tl.task_id = t.id
      JOIN users u ON tl.user_id = u.id
      WHERE t.project_id = :projectId
      GROUP BY u.id, u.username
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    // Weekly Progress
    const weeklyProgress = await sequelize.query(`
      SELECT 
        DATE_TRUNC('week', t.updated_at) as week,
        COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks,
        COUNT(*) as total_tasks
      FROM tasks t
      WHERE t.project_id = :projectId
      GROUP BY DATE_TRUNC('week', t.updated_at)
      ORDER BY week
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    res.json({
      overview: projectStats,
      taskDistribution,
      timeTracking,
      weeklyProgress
    });
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    res.status(500).json({ message: 'Error fetching project analytics' });
  }
};