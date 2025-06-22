const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const { getSimilarCourses } = require('../controllers/recommendationController')
const { protect } = require('../middleware/authMiddleware');

router.get('/recommendations', protect, getRecommendations);
router.get('/similar-courses', protect, getSimilarCourses);

module.exports = router;
