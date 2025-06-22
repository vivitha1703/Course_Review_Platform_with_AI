// app.js
const express = require('express');
const cors = require('cors');
// REMOVE THIS LINE: require('dotenv').config(); // <--- CRITICAL CHANGE: REMOVE DOTENV HERE

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// --- Routes ---
// Import and use your API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));

// Basic root route for server health check
app.get('/', (req, res) => {
  res.send('Course Review API Running');
});

module.exports = app; // Export the configured Express app instance