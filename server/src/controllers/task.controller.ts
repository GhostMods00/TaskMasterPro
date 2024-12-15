import { Response } from 'express';
import { Task, Project } from '../models';
import { AuthRequest } from '../middleware/auth.middleware';
import { Model } from 'sequelize';

interface TaskAttributes {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: number;
  assigneeId?: number;
  startDate?: Date;
  dueDate?: Date;
  estimatedHours?: number;
}

interface CreateTaskRequestBody {
  title: string;
  description?: string;
  projectId: number;
  priority: 'low' | 'medium' | 'high';
  startDate?: Date;
  dueDate?: Date;
  estimatedHours?: number;
  assigneeId?: number;
}

interface UpdateTaskStatusBody {
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

interface TaskParams {
  id: string;
}

export const createTask = async (
  req: AuthRequest<{}, {}, CreateTaskRequestBody>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { 
      title, 
      description, 
      projectId, 
      priority,
      startDate,
      dueDate,
      estimatedHours,
      assigneeId 
    } = req.body;

    const project = await Project.findOne({
      where: { 
        id: projectId,
        ownerId: req.user.id
      }
    });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const task = await Task.create({
      id: 0,
      title,
      description,
      projectId,
      priority,
      startDate,
      dueDate,
      estimatedHours,
      assigneeId: assigneeId || req.user.id,
      status: 'todo'
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const tasks = await Task.findAll({
      include: [{
        model: Project,
        where: { ownerId: req.user.id },
        attributes: ['id', 'title']
      }]
    });

    res.json(tasks);
  } catch (error) {
    console.error('Tasks fetch error:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const getTaskById = async (
  req: AuthRequest<TaskParams>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const task = await Task.findOne({
      where: { id: req.params.id },
      include: [{
        model: Project,
        where: { ownerId: req.user.id },
        attributes: ['id', 'title']
      }]
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error('Task fetch error:', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
};

export const updateTask = async (
  req: AuthRequest<TaskParams, {}, Partial<CreateTaskRequestBody>>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const task = await Task.findOne({
      include: [{
        model: Project,
        where: { ownerId: req.user.id }
      }],
      where: { id: req.params.id }
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const updatedTask = await task.update(req.body) as Model<TaskAttributes> & TaskAttributes;
    res.json(updatedTask);
  } catch (error) {
    console.error('Task update error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const updateTaskStatus = async (
  req: AuthRequest<TaskParams, {}, UpdateTaskStatusBody>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const task = await Task.findOne({
      include: [{
        model: Project,
        where: { ownerId: req.user.id }
      }],
      where: { id: req.params.id }
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const updatedTask = await task.update({ status: req.body.status }) as Model<TaskAttributes> & TaskAttributes;
    res.json(updatedTask);
  } catch (error) {
    console.error('Task status update error:', error);
    res.status(500).json({ message: 'Error updating task status' });
  }
};

export const deleteTask = async (
  req: AuthRequest<TaskParams>,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const task = await Task.findOne({
      include: [{
        model: Project,
        where: { ownerId: req.user.id }
      }],
      where: { id: req.params.id }
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Task deletion error:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};