import * as actionTypes from '../ActionTypes/RecipeActionType';

const initialState = {
    recipes: [],
    userPostedRecipes: [],
}

const RecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_RECIPES: {
            return {
                ...state,
                recipes: action.payload.recipes,
                userPostedRecipes: action.payload.userPostedRecipes,
            };
        }

        case actionTypes.REMOVE_ALL_RECIPES: {
            return {
                ...state,
                recipes: [],
                userPostedRecipes: [],
            };
        }

        case actionTypes.LIKE_UNLIKE_RECIPE: {
            const updatedRecipes = [
                ...state.recipes.map(recipe => {
                    if (recipe._id === action.payload) {
                        return {
                            ...recipe,
                            likes: recipe.likedByLoggedInUser ? recipe.likes - 1 : recipe.likes + 1,
                            likedByLoggedInUser: !recipe.likedByLoggedInUser,
                        }
                    }
                    return recipe;
                })
            ];

            const updatedUserRecipes = [
                ...state.userPostedRecipes.map(recipe => {
                    if (recipe._id === action.payload) {
                        return {
                            ...recipe,
                            likes: recipe.likedByLoggedInUser ? recipe.likes - 1 : recipe.likes + 1,
                            likedByLoggedInUser: !recipe.likedByLoggedInUser,
                        }
                    }
                    return recipe;
                })
            ];

            return {
                ...state,
                recipes: updatedRecipes,
                userPostedRecipes: updatedUserRecipes,
            }
        }

        default:
            return state;
    }
};

export default RecipeReducer;