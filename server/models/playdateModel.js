const mongoose = require("mongoose");

const playdateSchema = new mongoose.Schema({
  location: { type: String },
  time: { type: Time },
  numberOfAttendees: { type: Number },
  dog: {
    type: mongoose.Schema.Types.Id,
    ref: "Dog",
  },
  dogsitter: {
    type: mongoose.Schema.Types.Id,
    ref: "Dogsitter",
  },
});

const Playdate = mongoose.model("Playdate", playdateSchema);
