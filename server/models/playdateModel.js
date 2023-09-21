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
    type: Time,
    required: [true, "Time needs to be specified!"],
  },
  numberOfAttendees: { type: Number },
  dog: {
    type: mongoose.Schema.Types.Id,
    ref: "Dog",
    required: [true, "Please choose a dog!"],
  },
  dogsitter: {
    type: mongoose.Schema.Types.Id,
    ref: "Dogsitter",
    required: [trye, "Please choose a dogsitter!"],
  },
});

module.exports = mongoose.model("Playdate", playdateSchema);
