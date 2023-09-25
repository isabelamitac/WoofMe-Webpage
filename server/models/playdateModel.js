const mongoose = require("mongoose");

const playdateSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  date: {
    type: String,
    required: [true, "Date needs to be specified!"],
  },
  time: {
    type: String,
    required: [true, "Time needs to be specified!"],
  },
  otherOwners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "otherOwner",
    },
  ],
});

module.exports = mongoose.model("Playdate", playdateSchema);
