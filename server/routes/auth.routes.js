// routes/auth.routes.js
const express = require('express');
const router = express.Router();

// Import auth controllers
const { register, login /* other controllers */ } = require('../controllers/auth.controller');

// Define routes
router.post('/register', register);
router.post('/login', login);
// other routes...

module.exports = router;  // Export the router