const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Sample authentication routes

// Login route
router.post('/login', AuthController.login);

// Register route
router.post('/register', AuthController.register);

// Export the router
module.exports = router;
