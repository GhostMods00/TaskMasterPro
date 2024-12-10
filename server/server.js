// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Error handling middleware
app.use(require('./middleware/error.handler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});