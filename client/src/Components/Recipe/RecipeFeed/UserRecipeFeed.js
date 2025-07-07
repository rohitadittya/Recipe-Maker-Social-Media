import { getUserPostedRecipes } from "../../../Redux/Selectors/RecipeSelector";
import NoRecipeFound from "../../Shared/NoRecipeFound";
import RecipeCard from "../../Shared/RecipeCard";
import { useSelector } from "react-redux";

const UserRecipeFeed = () => {
    const recipes = useSelector(getUserPostedRecipes);

    return (
        <div className="user-recipe-feed-container container mt-5">
            {
                recipes?.length > 0 ?
                    recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} actionBtns={{
                        canLike: true,
                        canEdit: true,
                        canComment: true,
                        canDelete: true,
                    }} />)
                    : <NoRecipeFound />
            }
        </div>
    );
};

export default UserRecipeFeed;