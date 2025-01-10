// src/routes/task.routes.ts
import { Router } from 'express';
import { auth, checkRole } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { taskValidation } from '../validations/task.validation';
import { TaskController } from '../controllers/task.controller';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const controller = new TaskController();

router.use(auth);

router.post(
  '/projects/:projectId/tasks',
  validateRequest(taskValidation.createTask),
  asyncHandler(controller.createTask)
);

router.get(
  '/projects/:projectId/tasks',
  asyncHandler(controller.getProjectTasks)
);

router.put(
  '/tasks/:id',
  validateRequest(taskValidation.updateTask),
  asyncHandler(controller.updateTask)
);

router.post(
  '/tasks/:id/comments',
  validateRequest(taskValidation.addComment),
  asyncHandler(controller.addComment)
);

router.post(
  '/tasks/:id/time-logs',
  validateRequest(taskValidation.logTime),
  asyncHandler(controller.logTime)
);

router.delete(
  '/tasks/:id',
  asyncHandler(controller.deleteTask)
);

export default router;

// src/services/task.service.ts
import { Transaction } from 'sequelize';
import { Task, User, TimeLog, Comment } from '../models';
import { WebSocketService } from './websocket.service';
import { SlackService } from './integrations/slack.service';
import { AppError } from '../middleware/error.middleware';
import { CreateTaskDto, UpdateTaskDto, TaskQuery } from '../types/task.types';

export class TaskService {
  constructor(
    private wsService: WebSocketService,
    private slackService: SlackService
  ) {}

  async createTask(projectId: number, data: CreateTaskDto, userId: number) {
    const task = await Task.create({
      ...data,
      projectId,
      createdById: userId
    });

    // Notify project members
    this.wsService.emitTaskUpdate(projectId.toString(), {
      type: 'TASK_CREATED',
      task
    });

    // Send Slack notification if integrated
    await this.slackService.sendTaskNotification(projectId, {
      type: 'new_task',
      task
    });

    return task;
  }

  async updateTask(id: number, data: UpdateTaskDto, userId: number) {
    const task = await Task.findByPk(id, {
      include: [{ model: User, as: 'assignee' }]
    });

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    const updatedTask = await task.update(data);

    // Notify project members
    this.wsService.emitTaskUpdate(task.projectId.toString(), {
      type: 'TASK_UPDATED',
      task: updatedTask
    });

    // Send Slack notification for status changes
    if (data.status && data.status !== task.status) {
      await this.slackService.sendTaskNotification(task.projectId, {
        type: 'status_change',
        task: updatedTask
      });
    }

    return updatedTask;
  }

  async logTime(taskId: number, data: { hours: number; description?: string }, userId: number) {
    const timeLog = await TimeLog.create({
      taskId,
      userId,
      hoursLogged: data.hours,
      description: data.description
    });

    const task = await Task.findByPk(taskId);
    if (task) {
      this.wsService.emitTaskUpdate(task.projectId.toString(), {
        type: 'TIME_LOGGED',
        taskId,
        timeLog
      });
    }

    return timeLog;
  }

  async addComment(taskId: number, content: string, userId: number) {
    const comment = await Comment.create({
      taskId,
      userId,
      content
    });

    const task = await Task.findByPk(taskId);
    if (task) {
      this.wsService.emitTaskUpdate(task.projectId.toString(), {
        type: 'NEW_COMMENT',
        taskId,
        comment
      });

      await this.slackService.sendTaskNotification(task.projectId, {
        type: 'new_comment',
        task,
        comment
      });
    }

    return comment;
  }
}