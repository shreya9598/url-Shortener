const express = require('express');
const redisClient = require('./config/redis');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Load routes
app.use('/', urlRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Check Redis connection
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis connection error:', err));

// console.log("RUNNING")
