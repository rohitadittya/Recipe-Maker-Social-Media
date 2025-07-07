import '../Recipe/RecipeFeed/RecipeFeed.css';
import LikeBtn from './ActionBtns/LikeBtn';
import CommentBtn from './ActionBtns/CommentBtn';
import EditBtn from './ActionBtns/EditBtn';
import DeleteBtn from './ActionBtns/DeleteBtn';
import { useNavigate } from 'react-router-dom';

const RecipeCard = (props) => {
    const navigate = useNavigate();

    const {
        _id,
        recipeName,
        description,
        ingredients,
        instructions,
    } = props?.recipe || {};

    const {
        canLike = false,
        canComment = false,
        canEdit = false,
        canDelete = false,
    } = props?.actionBtns || {};

    const openARecipe = () => {
        navigate(`/recipe/${_id}`)
    }

    return (
        <div className="recipe-card-container container mt-5">
            <div className="recipe-card row justify-content-center">
                <div className="col-md-12 col-lg-12 shadow p-4 bg-body-tertiary rounded">
                    <div className="recipe-card-content" onClick={openARecipe}>

                    <h2 className="recipe-card-name mb-3 text-center">{recipeName}</h2>
                    <p className="recipe-card-desc text-muted">{description}</p>

                    <h5>Ingredients</h5>
                    <ul className="recipe-card-ingredients-list list-group mb-3">
                        {ingredients?.map((item, index) => (
                            <li key={index} className="list-group-item">
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h5>Instructions</h5>
                    <ol className="recipe-card-instruction-list list-group mb-3">
                        {instructions?.map((step, index) => (
                            <li key={index} className="list-group-item">
                                {step}
                            </li>
                        ))}
                    </ol>
                    </div>

                    <div className="recipe-card-action-btn-grp d-flex justify-content-start flex-wrap gap-2">
                        {canLike && <LikeBtn recipe={props.recipe} />}

                        {canComment && <CommentBtn recipe={props.recipe} />}

                        {canEdit && <EditBtn recipe={props.recipe} />}

                        {canDelete && <DeleteBtn recipe={props.recipe} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;