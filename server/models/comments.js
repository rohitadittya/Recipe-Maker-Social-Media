const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    createdTimeStamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedTimeStamp: {
        type: Date,
        required: false,
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;