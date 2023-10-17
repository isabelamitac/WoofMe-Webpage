const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('AdminModel', adminSchema);
