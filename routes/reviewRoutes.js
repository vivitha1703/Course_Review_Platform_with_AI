const express = require('express');
const { createReview, getCourseReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/reviews', protect, createReview);

router.get('/review/:courseId', getCourseReviews);

module.exports = router;