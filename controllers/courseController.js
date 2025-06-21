const Course = require('../models/courseModel');

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create course', error: err.message });
  }
};

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};

// Get Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course', error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const { department, difficulty, instructor, search } = req.query;

    let filter = {};

    if (department) {
      filter.department = new RegExp(department, 'i'); // case-insensitive
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch filtered courses', error: err.message });
  }
};

exports.autocompleteCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Query is required' });
    }

    const courses = await Course.find({
      title: new RegExp(query, 'i') // case-insensitive partial match
    }).select('title'); // only return course titles

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to autocomplete', error: err.message });
  }
};

