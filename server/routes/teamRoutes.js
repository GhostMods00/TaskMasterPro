// server/routes/teamRoutes.js
const express = require('express');
const {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const router = express.Router();

// Routes for team management
router.get('/', getTeamMembers); // Get all team members
router.post('/', addTeamMember); // Add a new team member
router.put('/:id', updateTeamMember); // Update team member by ID
router.delete('/:id', deleteTeamMember); // Delete team member by ID

module.exports = router;
