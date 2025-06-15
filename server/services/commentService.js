const commentsModel = require('../models/comments');
const { getLoggedInUserId } = require('../utils/utils');

// Handlers to handle internal fns
const getCommentByIdHandler = async (commentId, loggedInUserId) => {
    const comment = await commentsModel.findOne({ _id: commentId, userId: loggedInUserId });
    if (!comment) {
        throw { status: 404, message: `Comment with id: ${commentId} not found` };
    }
    return comment;
}

const deleteAllCommentsForRecipeHandler = async (recipeId) => {
    const deleted = await commentsModel.deleteMany({ recipeId });
    if (!deleted.acknowledged) {
        throw { message: `Unable to delete all the comments for the recipe id ${recipeId}`, status: 500 };
    }
};

// Functions to handle API
const comment = async (req) => {
    const commented = await commentsModel.create({ comment: req.body.comment, recipeId: req.body.recipeId, userId: getLoggedInUserId(req) });
    if (!commented) {
        throw { message: `Unable to comment for the recipe with id ${req.body.recipeId}`, status: 500 };
    }
    return await getCommentByIdHandler(commented._id, getLoggedInUserId(req));
};

const getAllCommentsByRecipeId = async (req) => {
    return await commentsModel.find({recipeId: req.params.id});
};

const deleteCommentByCommentId = async (req) => {
    await getCommentByIdHandler(req.params.id, getLoggedInUserId(req));
    const deleted = await commentsModel.deleteOne({ _id: req.params.id, userId: getLoggedInUserId(req) });
    if (!deleted.acknowledged) {
        throw { message: `Unable to delete the comment with id ${req.params.id}`, status: 500 };
    }
};

module.exports = {
    deleteAllCommentsForRecipeHandler,
    comment,
    getAllCommentsByRecipeId,
    deleteCommentByCommentId
}