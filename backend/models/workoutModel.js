// Description: This file contains the schema for the workout model
const mongoose = require("mongoose");

// Create a schema for workouts
// Schema is a blueprint for how the data should look
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model for workouts
module.exports = mongoose.model("Workout", workoutSchema);
