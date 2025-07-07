const baseUrls = {
    user: '/user',
    recipe: '/recipe',
    comment: '/comment',
}

export const EndPoints = {
    user: {
        login: `${baseUrls.user}/login`,
        register: `${baseUrls.user}/register`,
        update: `${baseUrls.user}/update`,
        getLoggedInUser: `${baseUrls.user}/loggedInUser`,
    },
    recipe: {
        getAllRecipes: `${baseUrls.recipe}`,
        addRecipe: `${baseUrls.recipe}`,
        fetchUserPostedRecipes: `${baseUrls.recipe}/user`,
        likeUnlikeRecipe: `${baseUrls.recipe}/like`,
        deleteARecipe: `${baseUrls.recipe}`
    },
    comment: {
        commentOnRecipe: `${baseUrls.comment}`,
        getCommentsForRecipe: `${baseUrls.comment}`,
    },
};