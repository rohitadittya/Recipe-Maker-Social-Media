const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdTimeStamp: {
        type: Date,
        default: Date.now,
    },
    deletedTimeStamp: {
        type: Date,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;