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
exports.updateTaskStatus = exports.logTime = exports.createTask = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { title, description, status, priority, assigneeId, dueDate } = req.body;
        const userId = req.user.id;
        const [task] = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.INSERT
        });
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
});
exports.createTask = createTask;
const logTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { hoursLogged, description } = req.body;
        const userId = req.user.id;
        const [timeLog] = yield database_1.sequelize.query(`
      INSERT INTO time_logs (task_id, user_id, hours_logged, description)
      VALUES (:taskId, :userId, :hoursLogged, :description)
      RETURNING *
    `, {
            replacements: { taskId, userId, hoursLogged, description },
            type: sequelize_1.QueryTypes.INSERT
        });
        res.status(201).json(timeLog);
    }
    catch (error) {
        console.error('Error logging time:', error);
        res.status(500).json({ message: 'Error logging time' });
    }
});
exports.logTime = logTime;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const userId = req.user.id;
        const [task] = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.UPDATE
        });
        if (!task) {
            return res.status(403).json({ message: 'Unauthorized to update this task' });
        }
        res.json(task);
    }
    catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ message: 'Error updating task status' });
    }
});
exports.updateTaskStatus = updateTaskStatus;
//# sourceMappingURL=task.controller.js.map