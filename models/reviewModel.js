const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  sentiment: String,
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);