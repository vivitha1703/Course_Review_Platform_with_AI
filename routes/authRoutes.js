const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', protect, getProfile);
router.put('/update', protect, authorizeRoles('student'), updateProfile);

module.exports = router;
