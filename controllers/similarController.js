const axios = require('axios');

exports.getSimilarCourses = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const response = await axios.post('http://localhost:8000/similar-courses', {
      course_id: courseId
    });

    res.json(response.data);
  } catch (err) {
    console.error("AI Similar Course Error:", err.message);
    res.status(500).json({ message: "Failed to fetch similar courses", error: err.message });
  }
};
