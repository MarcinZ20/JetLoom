const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  ReviewId: { type: Number, required: true },
  TripId: { type: Number, required: true },
  ReviewerName: { type: String, required: true },
  Title: { type: String, required: true },
  ReviewDate: { type: Date, required: true },
  ReviewText: { type: String, required: true },
  Rating: { type: Number, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
