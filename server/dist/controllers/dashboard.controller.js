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
exports.getRecentActivity = exports.getDashboardStats = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.user.id);
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
        const [stats] = yield database_1.sequelize.query(query, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        console.log('Dashboard stats result:', stats);
        res.json(stats);
    }
    catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: 'Error fetching dashboard statistics' });
    }
});
exports.getDashboardStats = getDashboardStats;
const getRecentActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.user.id);
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
        const [activity] = yield database_1.sequelize.query(query, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        console.log('Recent activity result:', activity);
        res.json(activity || { projects: [], tasks: [] });
    }
    catch (error) {
        console.error('Recent activity error:', error);
        res.status(500).json({ message: 'Error fetching recent activity' });
    }
});
exports.getRecentActivity = getRecentActivity;
//# sourceMappingURL=dashboard.controller.js.map