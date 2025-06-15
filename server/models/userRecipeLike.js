const mongoose = require('mongoose');

const userRecipeLikeSchema = new mongoose.Schema({
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

const UserRecipeLike = mongoose.model('UserRecipeLike', userRecipeLikeSchema);
module.exports = UserRecipeLike;