const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));


app.get('/', (req, res) => {
  res.send('Course Review API Running');
});

module.exports = app;
