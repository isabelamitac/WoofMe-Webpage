const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    location: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    dog: {
      type: mongoose.Schema.Types.Id,
      ref: "Dog",
    },
  });
  
  module.exports = mongoose.model ("OwnerModel", ownerSchema);