const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const sequelize = require('./config/db.config'); // Sequelize database connection
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Database Synchronization (Drop and Recreate Tables)
sequelize
    .sync({ alter: true }) // Set force: true to drop and recreate tables
    .then(() => console.log('Database synced successfully'))
    .catch((err) => console.error('Database sync failed:', err.message));

// Socket.IO Setup (Optional Real-Time Messaging)
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
        console.log('Message Received:', message);
        io.emit('receiveMessage', message); // Broadcast the message
    });

    socket.on('disconnect', () => console.log('A user disconnected'));
});

// Routes Registration
console.log("Registering Routes...");
app.use('/api/projects', require('./routes/project.routes')); // Project Routes
app.use('/api/test', require('./routes/test.routes'));        // Test Routes
console.log("Routes Registered Successfully!");

app.use((req, res, next) => {
    req.io = io; // Attach Socket.IO instance to request object
    next();
});

// Basic Test Route
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Root Test Route Working!' });
});

// 404 Route Not Found Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
