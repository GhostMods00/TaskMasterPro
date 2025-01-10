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
exports.TaskService = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const task_validation_1 = require("../validations/task.validation");
const task_controller_1 = require("../controllers/task.controller");
const error_middleware_1 = require("../middleware/error.middleware");
const router = (0, express_1.Router)();
const controller = new task_controller_1.TaskController();
router.use(auth_middleware_1.auth);
router.post('/projects/:projectId/tasks', (0, validation_middleware_1.validateRequest)(task_validation_1.taskValidation.createTask), (0, error_middleware_1.asyncHandler)(controller.createTask));
router.get('/projects/:projectId/tasks', (0, error_middleware_1.asyncHandler)(controller.getProjectTasks));
router.put('/tasks/:id', (0, validation_middleware_1.validateRequest)(task_validation_1.taskValidation.updateTask), (0, error_middleware_1.asyncHandler)(controller.updateTask));
router.post('/tasks/:id/comments', (0, validation_middleware_1.validateRequest)(task_validation_1.taskValidation.addComment), (0, error_middleware_1.asyncHandler)(controller.addComment));
router.post('/tasks/:id/time-logs', (0, validation_middleware_1.validateRequest)(task_validation_1.taskValidation.logTime), (0, error_middleware_1.asyncHandler)(controller.logTime));
router.delete('/tasks/:id', (0, error_middleware_1.asyncHandler)(controller.deleteTask));
exports.default = router;
const models_1 = require("../models");
const error_middleware_2 = require("../middleware/error.middleware");
class TaskService {
    constructor(wsService, slackService) {
        this.wsService = wsService;
        this.slackService = slackService;
    }
    createTask(projectId, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield models_1.Task.create(Object.assign(Object.assign({}, data), { projectId, createdById: userId }));
            this.wsService.emitTaskUpdate(projectId.toString(), {
                type: 'TASK_CREATED',
                task
            });
            yield this.slackService.sendTaskNotification(projectId, {
                type: 'new_task',
                task
            });
            return task;
        });
    }
    updateTask(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield models_1.Task.findByPk(id, {
                include: [{ model: models_1.User, as: 'assignee' }]
            });
            if (!task) {
                throw new error_middleware_2.AppError(404, 'Task not found');
            }
            const updatedTask = yield task.update(data);
            this.wsService.emitTaskUpdate(task.projectId.toString(), {
                type: 'TASK_UPDATED',
                task: updatedTask
            });
            if (data.status && data.status !== task.status) {
                yield this.slackService.sendTaskNotification(task.projectId, {
                    type: 'status_change',
                    task: updatedTask
                });
            }
            return updatedTask;
        });
    }
    logTime(taskId, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeLog = yield models_1.TimeLog.create({
                taskId,
                userId,
                hoursLogged: data.hours,
                description: data.description
            });
            const task = yield models_1.Task.findByPk(taskId);
            if (task) {
                this.wsService.emitTaskUpdate(task.projectId.toString(), {
                    type: 'TIME_LOGGED',
                    taskId,
                    timeLog
                });
            }
            return timeLog;
        });
    }
    addComment(taskId, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield models_1.Comment.create({
                taskId,
                userId,
                content
            });
            const task = yield models_1.Task.findByPk(taskId);
            if (task) {
                this.wsService.emitTaskUpdate(task.projectId.toString(), {
                    type: 'NEW_COMMENT',
                    taskId,
                    comment
                });
                yield this.slackService.sendTaskNotification(task.projectId, {
                    type: 'new_comment',
                    task,
                    comment
                });
            }
            return comment;
        });
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.routes.js.map