// server.js

// --- GLOBAL UNCAUGHT ERROR HANDLERS ---
// These are crucial for debugging crashes that happen outside of Promises
process.on('uncaughtException', (err) => {
    console.error('SERVER FATAL ERROR: Uncaught Exception:', err.message, err.stack);
    // It's critical to exit the process after an uncaught exception in production
    process.exit(1);
});

// Catches unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('SERVER FATAL ERROR: Unhandled Rejection at:', promise, 'reason:', reason);
    // It's critical to exit the process after an unhandled rejection in production
    process.exit(1);
});

// Load environment variables FIRST in the main entry point
require('dotenv').config();
console.log('SERVER INIT: Dotenv configured.');
// For security, avoid logging all process.env keys in production.
// During debugging, you can use: console.log('SERVER INIT: Process.env keys:', Object.keys(process.env).filter(key => key.startsWith('MONGO') || key.startsWith('PORT') || key.startsWith('JWT') || key === 'NODE_ENV').join(', '));

// Import the configured Express app from app.js
const app = require('./app'); // <--- THIS IS THE CRITICAL CHANGE
console.log('SERVER INIT: Express app imported from app.js.');

const mongoose = require('mongoose'); // Mongoose is still used here for database connection

// MongoDB Connection Section
const mongoURI = process.env.MONGO_URI;
console.log('SERVER INIT: Attempting MongoDB connection...');
console.log('SERVER INIT: MONGO_URI is set:', !!mongoURI); // Logs true if MONGO_URI is not empty

if (!mongoURI) {
    console.error('SERVER ERROR: MONGO_URI environment variable is NOT defined. Cannot connect to MongoDB. Exiting.');
    process.exit(1); // Exit immediately if MONGO_URI is missing
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('SERVER SUCCESS: MongoDB connected successfully!');
    // Only start the server (i.e., call app.listen) after a successful database connection
    const PORT = process.env.PORT || 5000; // Use Render's assigned PORT or default to 5000 for local dev
    console.log(`SERVER: Attempting to start server on port ${PORT}`);
    app.listen(PORT, () => {
      console.log(`SERVER SUCCESS: Server running and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('SERVER ERROR: MongoDB connection failed:', err.message);
    console.error(err.stack); // Print full stack trace for detailed debugging
    process.exit(1); // Exit if DB connection fails
  });

// No need for app.get('/') here; it's handled in app.js