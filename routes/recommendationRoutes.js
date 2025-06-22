const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController'); // ✅ correct path
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getRecommendations);

module.exports = router;
