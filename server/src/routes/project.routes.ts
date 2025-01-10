// src/routes/project.routes.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/project.controller';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes for project management
router.post('/', createProject); // Create project
router.get('/', getProjects); // Get all projects
router.get('/:id', getProjectById); // Get project by ID
router.put('/:id', updateProject); // Update project
router.delete('/:id', deleteProject); // Delete project

export default router;
