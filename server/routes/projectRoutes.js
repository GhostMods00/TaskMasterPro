
// server/routes/projectRoutes.js
const express = require('express');
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectById,
} = require('../controllers/projectController');
const router = express.Router();

// Routes for project management
router.get('/', getProjects); // Get all projects
router.get('/:id', getProjectById); // Get project by ID
router.post('/', addProject); // Add a new project
router.put('/:id', updateProject); // Update project by ID
router.delete('/:id', deleteProject); // Delete project by ID

module.exports = router;
