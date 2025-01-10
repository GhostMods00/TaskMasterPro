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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const { Project } = models_1.default;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, startDate, dueDate } = req.body;
        const userId = req.user.id;
        const project = yield Project.create({
            title,
            description,
            status,
            startDate,
            dueDate,
            ownerId: userId,
        });
        return res.status(201).json(project);
    }
    catch (error) {
        console.error('Create project error:', error);
        return res.status(500).json({ message: 'Error creating project', error });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { search, status } = req.query;
        const whereClause = {
            [sequelize_1.Op.or]: [
                { ownerId: userId },
            ],
        };
        if (status)
            whereClause.status = status;
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { description: { [sequelize_1.Op.iLike]: `%${search}%` } },
            ];
        }
        const projects = yield Project.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
        });
        return res.json(projects);
    }
    catch (error) {
        console.error('Get projects error:', error);
        return res.status(500).json({ message: 'Error fetching projects', error });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const project = yield Project.findOne({
            where: {
                id,
                ownerId: userId,
            },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.json(project);
    }
    catch (error) {
        console.error('Get project error:', error);
        return res.status(500).json({ message: 'Error fetching project', error });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, description, status, startDate, dueDate } = req.body;
        const project = yield Project.findOne({
            where: {
                id,
                ownerId: userId,
            },
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        yield project.update({
            title,
            description,
            status,
            startDate,
            dueDate,
        });
        return res.json(project);
    }
    catch (error) {
        console.error('Update project error:', error);
        return res.status(500).json({ message: 'Error updating project', error });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = yield Project.destroy({
            where: {
                id,
                ownerId: userId,
            },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error('Delete project error:', error);
        return res.status(500).json({ message: 'Error deleting project', error });
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.controller.js.map