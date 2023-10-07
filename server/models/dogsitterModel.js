const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const dogsitterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field!'],
    },
    password: {
        type: String,
        required: [true, 'Password is a required field!'],
    },
    location: {
        type: String,
        required: [true, 'Location is a required field!'],
    },
    dateAvailable: {
        type: Date,
        required: [true, 'Date available is a required field!'],
    },
    timeAvailable: {
        type: String,
        required: [true, 'Time available is a required field!'],
    },
    profilePhotoURL: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    dogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dogs',
        },
    ],
});

module.exports = mongoose.model('DogsitterModel', dogsitterSchema);
