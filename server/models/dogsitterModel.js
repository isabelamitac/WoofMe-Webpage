const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const dogsitterSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: [true, "Name is required field!" ]
    },
    dateAvailable: { 
        type: Date, 
        required: [true, "Date available is required field!" ] 
      },
    timeAvailable: { 
        type: String, 
        required: [true, "Time available is required field!" ]
      },
    rating: { 
      type: Number, 
      required: false 
    }
  });
  
  module.exports = mongoose.model ("DogsitterModel", dogsitterSchema);