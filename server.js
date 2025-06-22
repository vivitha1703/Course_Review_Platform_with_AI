console.log('SERVER: Script execution started.'); // <-- Add this

require('dotenv').config();
console.log('SERVER: Dotenv configured. Process.env keys:', Object.keys(process.env).join(', ')); // <-- Add this to see env vars

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // Assuming Express app is initialized here or imported from app.js
console.log('SERVER: Express app initialized.'); // <-- Add this

app.use(cors());
app.use(express.json());
console.log('SERVER: Middleware applied (CORS, JSON parser).'); // <-- Add this

const mongoURI = process.env.MONGO_URI;
console.log('SERVER: Attempting to connect to MongoDB. MONGO_URI loaded:', !!mongoURI); // <-- Check if URI exists

if (!mongoURI) {
  console.error('SERVER: ERROR: MongoDB URI is NOT defined in environment variables. Exiting.'); // <-- More specific error
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('SERVER: MongoDB connected successfully!'); // <-- Success log
    // Proceed with starting the server only after DB connection
    const PORT = process.env.PORT || 5000;
    console.log(`SERVER: Attempting to start server on port ${PORT}`); // <-- Before listen
    app.listen(PORT, () => {
      console.log(`SERVER: Server successfully running and listening on port ${PORT}`); // <-- Final success log
    });
  })
  .catch((err) => {
    console.error('SERVER: ERROR: MongoDB connection failed:', err.message, err.stack); // <-- Detailed error
    process.exit(1); // Exit if DB connection fails
  });

// Add routes and other app logic here
app.get('/', (req, res) => {
  res.send('Backend is alive!');
});

// Add global unhandled error listeners for Node.js (Crucial for catching crashes)
process.on('uncaughtException', (err) => {
    console.error('SERVER: FATAL: Uncaught Exception:', err.message, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('SERVER: FATAL: Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});