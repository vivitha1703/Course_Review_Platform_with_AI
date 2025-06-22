const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  instructor: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  instructor_details: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
