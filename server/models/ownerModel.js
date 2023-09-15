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
    }
  });
  
  module.exports = mongoose.model ("OwnerModel", ownerSchema);