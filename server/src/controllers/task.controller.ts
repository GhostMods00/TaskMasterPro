// server/src/controllers/task.controller.ts
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, priority, assigneeId, dueDate } = req.body;
    const userId = (req as any).user.id;

    const [task] = await sequelize.query(`
      INSERT INTO tasks (
        title, description, status, priority, 
        project_id, assignee_id, created_by, due_date
      )
      VALUES (
        :title, :description, :status, :priority, 
        :projectId, :assigneeId, :userId, :dueDate
      )
      RETURNING *
    `, {
      replacements: { 
        title, description, status, priority,
        projectId, assigneeId, userId, dueDate
      },
      type: QueryTypes.INSERT
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const logTime = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { hoursLogged, description } = req.body;
    const userId = (req as any).user.id;

    const [timeLog] = await sequelize.query(`
      INSERT INTO time_logs (task_id, user_id, hours_logged, description)
      VALUES (:taskId, :userId, :hoursLogged, :description)
      RETURNING *
    `, {
      replacements: { taskId, userId, hoursLogged, description },
      type: QueryTypes.INSERT
    });

    res.status(201).json(timeLog);
  } catch (error) {
    console.error('Error logging time:', error);
    res.status(500).json({ message: 'Error logging time' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = (req as any).user.id;

    const [task] = await sequelize.query(`
      UPDATE tasks
      SET status = :status, updated_at = CURRENT_TIMESTAMP
      WHERE id = :taskId AND (
        assignee_id = :userId OR 
        created_by = :userId OR
        EXISTS (
          SELECT 1 FROM project_members 
          WHERE project_id = tasks.project_id 
          AND user_id = :userId 
          AND role = 'manager'
        )
      )
      RETURNING *
    `, {
      replacements: { taskId, status, userId },
      type: QueryTypes.UPDATE
    });

    if (!task) {
      return res.status(403).json({ message: 'Unauthorized to update this task' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Error updating task status' });
  }
};