// be able to view create and track daily workouts.
// be able to log multiple exercises in a workout on a given day.
// be able to track the name, type, weight, sets, reps, and duration of exercise. 
// If the exercise is a cardio exercise, I should be able to track my distance traveled.
// Add exercises to the most recent workout plan.
// Add new exercises to a new workout plan.
// View the combined weight of multiple exercises from the past seven workouts on the stats page.
// View the total duration of each workout from the past seven workouts on the stats page.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutseed", { useNewUrlParser: true });

db.Workout.create({ name: "Workout Plan" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  });

  app.get("/exercises", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/wokrouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/populated", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
// Set the app to listen on port 3000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  