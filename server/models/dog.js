let mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
    ownerId: { type: String },
    age: { type: Number },
    name: { type: String },
    breed: { type: String },
    diet: { type: String }
});

//Model dog schema
let Dog = mongoose.model('dogs', dogSchema);

const DogModule = mongoose.model("Dog", dogSchema);
module.exports = DogModule;