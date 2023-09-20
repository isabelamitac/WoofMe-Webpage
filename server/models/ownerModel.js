const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    location: { 
      type: String, 
      required: [true, "Location is required field!"] 
    },
    name: { 
      type: String, 
      required: [true, "Name is required field!" ]
    },
    email: { 
      type: String, 
      required: [true, "Email address is required field!"] 
    },
    dog: {
      type: mongoose.Types.ObjectId, ref: "Dog"}
  });
  
  module.exports = mongoose.model ("OwnerModel", ownerSchema);