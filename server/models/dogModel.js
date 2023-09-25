let mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
    ownerId: { 
        type: String,
        required: [true, "Owner id is required field!"]
    },
    age: { 
        type: Number,
        required: [true, "Age is required field!"]
    },
    name: { 
        type: String,
        required: [true, "Name is required field!"]
    },
    breed: {
        type: String,
        required: [true, "Breed is required field!"]
    },
    diet: {
        type: String,
        required: [true, "Diet is required field!"]
    }
});

const DogModule = mongoose.model("Dog", dogSchema);
module.exports = DogModule;