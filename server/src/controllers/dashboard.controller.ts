// src/controllers/dashboard.controller.ts
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number((req as any).user.id);
    console.log('Getting dashboard stats for user ID:', userId);

    const query = `
      WITH user_projects AS (
        SELECT DISTINCT p.id
        FROM projects p
        LEFT JOIN project_members pm ON p.id = pm.project_id
        WHERE p.owner_id = :userId OR pm.user_id = :userId
      )
      SELECT 
        (SELECT COUNT(*) FROM user_projects) as total_projects,
        
        (SELECT COUNT(*) FROM tasks t
         WHERE t.project_id IN (SELECT id FROM user_projects)) as total_tasks,
        
        (SELECT COUNT(DISTINCT pm.user_id) 
         FROM project_members pm
         WHERE pm.project_id IN (SELECT id FROM projects WHERE owner_id = :userId)
        ) as team_members`;

    const [stats] = await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT
    });

    console.log('Dashboard stats result:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
};

export const getRecentActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number((req as any).user.id);

    const query = `
      WITH user_projects AS (
        SELECT DISTINCT p.id
        FROM projects p
        LEFT JOIN project_members pm ON p.id = pm.project_id
        WHERE p.owner_id = :userId OR pm.user_id = :userId
      )
      SELECT json_build_object(
        'projects', (
          SELECT json_agg(
            json_build_object(
              'id', p.id,
              'title', p.title,
              'status', p.status,
              'created_at', p.created_at
            )
          )
          FROM (
            SELECT * FROM projects 
            WHERE id IN (SELECT id FROM user_projects)
            ORDER BY created_at DESC 
            LIMIT 5
          ) p
        ),
        'tasks', (
          SELECT json_agg(
            json_build_object(
              'id', t.id,
              'title', t.title,
              'status', t.status,
              'project_title', p.title,
              'created_at', t.created_at
            )
          )
          FROM (
            SELECT * FROM tasks 
            WHERE project_id IN (SELECT id FROM user_projects)
            ORDER BY created_at DESC 
            LIMIT 5
          ) t
          JOIN projects p ON t.project_id = p.id
        )
      ) as activity`;

    const [activity] = await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT
    });

    console.log('Recent activity result:', activity);
    res.json(activity || { projects: [], tasks: [] });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({ message: 'Error fetching recent activity' });
  }
};