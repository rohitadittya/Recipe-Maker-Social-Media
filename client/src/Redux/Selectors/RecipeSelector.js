export const getAllRecipes = (state) => state.recipes.recipes || [];
export const getUserPostedRecipes = (state) => state.recipes.userPostedRecipes || [];
export const getRecipeById = (state, recipeId) => state.recipes.recipes.find(recipe => recipe._id === recipeId) || null;