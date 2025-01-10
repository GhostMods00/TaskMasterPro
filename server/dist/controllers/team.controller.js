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
exports.updateMemberRole = exports.getProjectTeam = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const getProjectTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;
        const members = yield database_1.sequelize.query(`
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
            type: sequelize_1.QueryTypes.SELECT
        });
        res.json(members);
    }
    catch (error) {
        console.error('Error fetching project team:', error);
        res.status(500).json({ message: 'Error fetching project team' });
    }
});
exports.getProjectTeam = getProjectTeam;
const updateMemberRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, memberId } = req.params;
        const { role } = req.body;
        const userId = req.user.id;
        const [project] = yield database_1.sequelize.query(`
      SELECT * FROM projects WHERE id = :projectId AND owner_id = :userId
    `, {
            replacements: { projectId, userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!project) {
            return res.status(403).json({ message: 'Unauthorized to update member roles' });
        }
        const [member] = yield database_1.sequelize.query(`
      UPDATE project_members
      SET role = :role
      WHERE project_id = :projectId AND user_id = :memberId
      RETURNING *
    `, {
            replacements: { projectId, memberId, role },
            type: sequelize_1.QueryTypes.UPDATE
        });
        res.json(member);
    }
    catch (error) {
        console.error('Error updating member role:', error);
        res.status(500).json({ message: 'Error updating member role' });
    }
});
exports.updateMemberRole = updateMemberRole;
//# sourceMappingURL=team.controller.js.map