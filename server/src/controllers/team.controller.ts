// server/src/controllers/team.controller.ts
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const getProjectTeam = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.id;

    const members = await sequelize.query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        pm.role as project_role,
        COUNT(t.id) as assigned_tasks,
        COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks,
        SUM(tl.hours_logged) as total_hours_logged
      FROM project_members pm
      JOIN users u ON pm.user_id = u.id
      LEFT JOIN tasks t ON t.assignee_id = u.id AND t.project_id = pm.project_id
      LEFT JOIN time_logs tl ON tl.task_id = t.id
      WHERE pm.project_id = :projectId
      GROUP BY u.id, u.username, u.email, pm.role
    `, {
      replacements: { projectId },
      type: QueryTypes.SELECT
    });

    res.json(members);
  } catch (error) {
    console.error('Error fetching project team:', error);
    res.status(500).json({ message: 'Error fetching project team' });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const { projectId, memberId } = req.params;
    const { role } = req.body;
    const userId = (req as any).user.id;

    // Check if user is project owner
    const [project] = await sequelize.query(`
      SELECT * FROM projects WHERE id = :projectId AND owner_id = :userId
    `, {
      replacements: { projectId, userId },
      type: QueryTypes.SELECT
    });

    if (!project) {
      return res.status(403).json({ message: 'Unauthorized to update member roles' });
    }

    const [member] = await sequelize.query(`
      UPDATE project_members
      SET role = :role
      WHERE project_id = :projectId AND user_id = :memberId
      RETURNING *
    `, {
      replacements: { projectId, memberId, role },
      type: QueryTypes.UPDATE
    });

    res.json(member);
  } catch (error) {
    console.error('Error updating member role:', error);
    res.status(500).json({ message: 'Error updating member role' });
  }
};