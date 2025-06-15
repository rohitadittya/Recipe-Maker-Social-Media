const mongoose = require('mongoose');
const recipeModel = require('../models/recipe');
const userRecipeLikeModel = require('../models/userRecipeLike');
const { getLoggedInUserId } = require('../utils/utils');

// Handlers to handle internal fns
const fetchRecipeByIdHandler = async (recipeId, loggedInUserId) => {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        throw { status: 400, message: 'Invalid recipe ID' };
    }

    const recipe = await recipeModel.findById(recipeId);
    if (!recipe) {
        throw { status: 404, message: 'Recipe not found' };
    }

    const [likedByLoggedInUser, likes] = await Promise.all([
        userRecipeLikeModel.exists({ userId: loggedInUserId, recipeId }).then(res => res ? 1 : 0),
        userRecipeLikeModel.countDocuments({ recipeId })
    ]);

    return {
        ...recipe.toObject(),
        likedByLoggedInUser,
        likes
    };
};

const checkIfRecipeOwnedByUserHandler = async (recipeId, loggedInUserId) => {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
        throw { status: 400, message: 'Invalid recipe ID' };
    }
    const existingRecipe = await fetchRecipeByIdHandler(recipeId, loggedInUserId);
    if (existingRecipe.userId.toString() !== loggedInUserId.toString()) {
        throw { status: 403, message: 'You are not authorized to edit this recipe' };
    }
};

// Functions to handle API
const fetchRecipeById = async (req) => {
    return await fetchRecipeByIdHandler(req.params.id, getLoggedInUserId(req));
};

const fetchAllRecipes = async (req) => {
    const recipes = await recipeModel.find();
    return Promise.all(recipes.map(recipe => fetchRecipeByIdHandler(recipe._id, getLoggedInUserId(req))));
};

const fetchAllUserPostedRecipes = async (req) => {
    const recipes = await recipeModel.find({ userId: getLoggedInUserId(req) });
    return Promise.all(recipes.map(recipe => fetchRecipeByIdHandler(recipe._id, getLoggedInUserId(req))));
};

const addRecipe = async (req) => {
    const recipeData = {
        recipeName: req.body.recipeName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: req.file ? req.file.buffer : null,
        userId: getLoggedInUserId(req),
    };
    const recipe = await recipeModel.create(recipeData);
    if (!recipe) {
        throw { message: 'Unable to create recipe', status: 500 };
    }
    return recipe;
};

const updateRecipe = async (req) => {
    const updateData = {
        recipeName: req.body.recipeName,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    };
    if (req.file) {
        updateFields.image = req.file.buffer;
    }

    const recipe = await recipeModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );
    if (!recipe) {
        throw { message: 'Unable to edit recipe', status: 500 };
    }
    return recipe;
};

const deleteRecipe = async (req) => {
    const recipe = await recipeModel.findByIdAndDelete(req.params.id);
    if (!recipe) {
        throw {
            message: `Recipe with ID ${req.params.id} not found or already deleted.`,
            status: 404,
        };
    }
};

module.exports = {
    fetchRecipeById,
    fetchAllRecipes,
    addRecipe,
    fetchAllUserPostedRecipes,
    updateRecipe,
    deleteRecipe,
    fetchRecipeByIdHandler,
    checkIfRecipeOwnedByUserHandler
};