const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    location: {
        type: String,
        // required: [true, 'Location is a required field!'],
    },
    name: {
        type: String,
        // required: [true, 'Name is a required field!'],
    },
    email: {
        type: String,
        required: [true, 'Email address is a required field!'],
        unique: [true, 'Account for this email already exists!']
    },
    password: {
        type: String,
        required: [true, 'Password is a required field!']
    },
    dogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dog',
        },
    ],
    playdates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'playdate',
        },
    ]
});

module.exports = mongoose.model('OwnerModel', ownerSchema);
