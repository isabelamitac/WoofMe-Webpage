const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required field!"],
  },
  name: {
    type: String,
    required: [true, "Name is required field!"],
  },
  email: {
    type: String,
    required: [true, "Email address is required field!"],
  },
  dog: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dog",
    },
  ],
  playdate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playdate",
  },
});

module.exports = mongoose.model("OwnerModel", ownerSchema);
