import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../../Shared/RecipeCard";
import { useEffect } from "react";
import { fetchAllRecipes } from "../../../Redux/Actions/RecipeActions";
import { getAllRecipes } from "../../../Redux/Selectors/RecipeSelector";
import NoRecipeFound from "../../Shared/NoRecipeFound";

const PublicFeed = () => {
    const recipes = useSelector(getAllRecipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRecipes());
    }, [dispatch])


    return (
        <div className="public-feed-container container mt-5">
            {
                recipes?.length > 0 ?
                    recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} actionBtns={{
                        canLike: true,
                        canComment: true
                    }} />)
                    : <NoRecipeFound />
            }
        </div>
    );
};

export default PublicFeed;