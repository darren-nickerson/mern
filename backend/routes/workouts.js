const express = require("express");

// import controller
const {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// instantiate express router
const router = express.Router();

// Get all workouts
router.get("/", getAllWorkouts);

// Get one workout
router.get("/:id", getOneWorkout);

// Post a workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
