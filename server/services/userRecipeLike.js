const userRecipeLikeModel = require('../models/userRecipeLike');
const { getLoggedInUserId } = require('../utils/utils');

// Handlers to handle internal fns
const deleteAllLikeForRecipeHandler = async (recipeId) => {
    const deleted = await userRecipeLikeModel.deleteMany({ recipeId });
    if (!deleted.acknowledged) {
        throw { message: `Unable to delete all the likes for the recipe id ${recipeId}`, status: 500 };
    }
}

// Functions to handle API
const likeARecipe = async (req) => {
    const isRecipeAlreadyLiked = await userRecipeLikeModel.find({ recipeId: req.params.id, userId: getLoggedInUserId(req) });
    if (isRecipeAlreadyLiked?.length > 0) {
        return await unlikeARecipe(req);
    }

    const likedRecord = await userRecipeLikeModel.create({ recipeId: req.params.id, userId: getLoggedInUserId(req) });
    if (!likedRecord) {
        throw { message: `Unable to like the recipe for the id ${req.params.id}`, status: 500 };
    }
};

const unlikeARecipe = async (req) => {
    const unliked = await userRecipeLikeModel.deleteOne({ recipeId: req.params.id, userId: getLoggedInUserId(req)} );
    if (!unliked.acknowledged) {
        throw { message: `Unable to unlike the recipe for the id ${req.params.id}`, status: 500 };
    }
};

module.exports = {
    likeARecipe,
    deleteAllLikeForRecipeHandler
};