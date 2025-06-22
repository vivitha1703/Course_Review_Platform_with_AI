// --- GLOBAL UNCAUGHT ERROR HANDLERS ---
// These are crucial for debugging crashes that happen outside of Promises
process.on('uncaughtException', (err) => {
  console.error('SERVER FATAL ERROR: Uncaught Exception:', err.message, err.stack);
  process.exit(1); // Exit after uncaught exception
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('SERVER FATAL ERROR: Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit after unhandled rejection
});

// Load environment variables FIRST
require('dotenv').config();
console.log('SERVER INIT: Dotenv configured.');

const mongoose = require('mongoose');

// Import the configured Express app from app.js
const app = require('./app');
console.log('SERVER INIT: Express app imported from app.js.');

// MongoDB Connection Section
const mongoURI = process.env.MONGO_URI;
console.log('SERVER INIT: Attempting MongoDB connection...');
console.log('SERVER INIT: MONGO_URI is set:', !!mongoURI);

if (!mongoURI) {
  console.error('SERVER ERROR: MONGO_URI environment variable is NOT defined. Cannot connect to MongoDB. Exiting.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('SERVER SUCCESS: MongoDB connected successfully!');
    const PORT = process.env.PORT || 5000;
    console.log(`SERVER: Attempting to start server on port ${PORT}`);
    app.listen(PORT, () => {
      console.log(`SERVER SUCCESS: Server running and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('SERVER ERROR: MongoDB connection failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
