const express = require('express');
const router = express.Router();
const { getSimilarCourses } = require('../controllers/similarController');
const { protect } = require('../middleware/authMiddleware'); 

// Optional: protect this route if needed
router.get('/:courseId', getSimilarCourses);

module.exports = router;
