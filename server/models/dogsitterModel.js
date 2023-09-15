const mongoose = require('mongoose');

const dogsitterSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    dateAvailable: { 
        type: Date, 
        required: true 
      },
    timeAvailable: { 
        type: String, 
        required: true 
      },
    rating: { 
      type: Number, 
      required: false 
    }
  });
  
  module.exports = mongoose.model ("DogsitterModel", dogsitterSchema);