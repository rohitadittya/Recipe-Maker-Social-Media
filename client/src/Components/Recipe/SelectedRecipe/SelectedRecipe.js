import { useSelector } from "react-redux";
import RecipeCard from "../../Shared/RecipeCard";
import { getRecipeById } from "../../../Redux/Selectors/RecipeSelector";
import { useParams } from "react-router-dom";
import NoRecipeFound from "../../Shared/NoRecipeFound";
import Comment from "../Comments/Comment";
import "./SelectedRecipe.css";

const SelectedRecipe = (props) => {
    const { id } = useParams();
    const recipe = useSelector((state) => getRecipeById(state, id));

    const recipeCommentSection = (
        <div className="recipe-comment-section row g-4">
            <div className="recipe-section col-md-6">
                <RecipeCard recipe={recipe} />
            </div>
            <div className="comment-section col-md-6">
                <div className="comment-card card shadow-sm">
                    <Comment recipe={recipe} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="selected-recipe-container container mt-4">
            {
                recipe != null ? recipeCommentSection : <NoRecipeFound />
            }
        </div>
    );
};

export default SelectedRecipe;