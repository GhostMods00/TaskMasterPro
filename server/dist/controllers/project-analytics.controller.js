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
exports.getProjectAnalytics = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const getProjectAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;
        const [projectStats] = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
        const taskDistribution = yield database_1.sequelize.query(`
      SELECT 
        status,
        COUNT(*) as count,
        COUNT(*)::float / SUM(COUNT(*)) OVER () * 100 as percentage
      FROM tasks
      WHERE project_id = :projectId
      GROUP BY status
    `, {
            replacements: { projectId },
            type: sequelize_1.QueryTypes.SELECT
        });
        const timeTracking = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
        const weeklyProgress = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json({
            overview: projectStats,
            taskDistribution,
            timeTracking,
            weeklyProgress
        });
    }
    catch (error) {
        console.error('Error fetching project analytics:', error);
        res.status(500).json({ message: 'Error fetching project analytics' });
    }
});
exports.getProjectAnalytics = getProjectAnalytics;
//# sourceMappingURL=project-analytics.controller.js.map