const mongoose = require("mongoose");

const playdateSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  date: {
    type: Date,
    required: [true, "Date needs to be specified!"],
  },
  time: {
    type: String,
    required: [true, "Time needs to be specified!"],
  },
  numberOfAttendees: { type: Number },
  dog: {
    type: mongoose.Types.ObjectId,
    ref: "Dog",
    required: [true, "Please choose a dog!"],
  },
  dogsitter: {
    type: mongoose.Types.ObjectId,
    ref: "Dogsitter",
    required: [true, "Please choose a dogsitter!"],
  },
});

module.exports = mongoose.model("Playdate", playdateSchema);
