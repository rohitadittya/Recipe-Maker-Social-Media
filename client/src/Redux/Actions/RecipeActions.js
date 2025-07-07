import httpClient from "../../Utils/Api";
import { EndPoints } from "../../Utils/EndPoints";
import * as recipeAction from "../ActionTypes/RecipeActionType";

const fetchAllRecipes = () => async (dispatch) => {
    try {
        const [recipes, userPostedRecipes] = await Promise.all([
            httpClient(EndPoints.recipe.getAllRecipes),
            httpClient(EndPoints.recipe.fetchUserPostedRecipes)
        ]);

        const recipeActionPayload = {
            recipes: recipes || [],
            userPostedRecipes: userPostedRecipes || [],
        };

        await dispatch({
            type: recipeAction.SET_ALL_RECIPES,
            payload: recipeActionPayload,
        });
    }
    catch (error) {
        console.error("Error fetching all the recipes:", error);
    }
};

const upsertRecipe = (recipe) => async (dispatch) => {
    try {
        let upsertRecipeRes = null;

        if (!recipe._id) {
            upsertRecipeRes = await httpClient(EndPoints.recipe.addRecipe, "POST", recipe);
        }
        else {
            upsertRecipeRes = await httpClient(`${EndPoints.recipe.addRecipe}/${recipe._id}`, "PUT", recipe);
        }

        dispatch(fetchAllRecipes());
        return upsertRecipeRes;
    }
    catch (error) {
        console.error("Error adding or updating the recipe:", error);
    }
};

const likeUnlikeARecipe = (recipeId) => async (dispatch) => {
    try {
        await httpClient(`${EndPoints.recipe.likeUnlikeRecipe}/${recipeId}`, "POST");
        dispatch({
            type: recipeAction.LIKE_UNLIKE_RECIPE,
            payload: recipeId,
        });
    }
    catch (error) {
        console.error("Error liking the recipe:", error);
    }
};

const commentOnRecipe = (commentPayload) => async (dispatch) => {
    try {
        await httpClient(EndPoints.comment.commentOnRecipe, "POST", commentPayload);
        return await dispatch(getAllCommentsForRecipe(commentPayload.recipeId));
    }
    catch (error) {
        console.error("Error commenting on the recipe:", error);
        return {
            error: true
        }
    }
};

const getAllCommentsForRecipe = (recipeId) => async (dispatch) => {
    try {
        const comments = await httpClient(`${EndPoints.comment.getCommentsForRecipe}/${recipeId}`);
        return comments || [];
    }
    catch (error) {
        console.error("Error commenting on the recipe:", error);
        return {
            error: true
        }
    }
};

const deleteARecipe = (recipeId) => async (dispatch) => {
    try {
        await httpClient(`${EndPoints.recipe.deleteARecipe}/${recipeId}`, "DELETE");
        dispatch(fetchAllRecipes());
    }
    catch (error) {
        console.error("Error deleting the recipe:", error);
        return {
            error: true
        }
    }
};

export {
    fetchAllRecipes,
    upsertRecipe,
    likeUnlikeARecipe,
    commentOnRecipe,
    getAllCommentsForRecipe,
    deleteARecipe,
}