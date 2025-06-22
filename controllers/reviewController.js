const Review = require('../models/reviewModel');
const analyzeSentiment = require('../Services/flaskService');



exports.createReview = async (req, res) => {
  const { courseId, rating, comment } = req.body;

  const sentimentResult = await analyzeSentiment(comment);
  console.log(sentimentResult)
  const review = await Review.create({
    userId: req.user._id,
    course_id,
    rating,
    comment,
    sentiment: sentimentResult.sentiment
  });

  res.status(201).json(review);
};

// @desc Get all reviews for a course
exports.getCourseReviews = async (req, res) => {
  const reviews = await Review.find({ courseId: req.params.courseId }).populate('user_id', 'name');
  res.json(reviews);
};
