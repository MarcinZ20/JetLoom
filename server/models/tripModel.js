const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  TripId: { type: Number, required: true },
  TripName: { type: String, required: true },
  Country: { type: String, required: true },
  City: { type: String, required: true },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date, required: true },
  Price: { type: Number, required: true },
  MaxCapacity: { type: Number, required: true },
  Description: { type: String, required: true },
  Image: { type: String, required: true },
  Tags: { type: [String], required: true },
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
