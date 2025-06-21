const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses, getCourseById, autocompleteCourses} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Public
router.get('/', getAllCourses);
('/:id', getCourseById);
router.get('/autocomplete', autocompleteCourses);

// Admin Only
router.post('/', protect, authorizeRoles('admin'), createCourse);

module.exports = router;
