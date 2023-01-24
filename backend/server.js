//  dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv").config();

//import mongoose
const mongoose = require("mongoose");

// import express
const express = require("express");

// import cors
const cors = require("cors");

// import routes
const workoutRoutes = require("./routes/workouts");

// create express instnace
const app = express();

// middleware
// Parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());

// console.logs request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen on port 3000 for incoming requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
