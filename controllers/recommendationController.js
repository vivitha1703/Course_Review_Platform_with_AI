const axios = require('axios');
const URL = process.env.AI_URL || 'http://localhost:5001';
exports.getRecommendations = async (req, res) => {
  try {
    const response = await axios.post(await axios.post(`${URL}/sentiment`), {
      user_id: req.user._id.toString()
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI recommendation failed', error: err.message });
  }
};

exports.getSimilarCourses = async (req, res) => {
  try {
    const response = await axios.post(await axios.post(`${URL}/similar-courses`), {
      user_id: req.course._id.toString()
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI recommendation failed', error: err.message });
  }
};
