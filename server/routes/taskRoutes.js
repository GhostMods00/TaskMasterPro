// server/routes/taskRoutes.js
const express = require('express');
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require('../controllers/taskController');
const router = express.Router();

// Routes for task management
router.get('/:projectId/tasks', getTasks); // Get all tasks for a project
router.get('/tasks/:id', getTaskById); // Get a task by ID
router.post('/:projectId/tasks', addTask); // Add a new task to a project
router.put('/tasks/:id', updateTask); // Update a task by ID
router.delete('/tasks/:id', deleteTask); // Delete a task by ID

module.exports = router;
