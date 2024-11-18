const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const redisClient = require('./config/redis');
const cors = require("cors");

const app = express();
const PORT = 3000;

// Allow requests from your frontend origin
app.use(cors({
    origin: "http://localhost:5174"
}));

(async () => {
    try {
        // Connect to Redis
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
        process.exit(1); // Exit the process if Redis connection fails
    }
})();

// payload to parse JSON
app.use(express.json());

// Load routes
app.use('/', urlRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

