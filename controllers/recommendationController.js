const axios = require('axios');
//call form main AI service to get recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/recommend', {
      user_id: req.user._id.toString()
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI recommendation failed', error: err.message });
  }
};
