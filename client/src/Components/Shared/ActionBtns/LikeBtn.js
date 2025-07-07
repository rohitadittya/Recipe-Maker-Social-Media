import { useDispatch } from "react-redux";
import { likeUnlikeARecipe } from "../../../Redux/Actions/RecipeActions";

const LikeBtn = (props) => {
    const { _id, likes, likedByLoggedInUser } = props?.recipe;
    const dispatch = useDispatch();

    const likeHandler = () => {
        dispatch(likeUnlikeARecipe(_id));
    };

    return (
        <button
            className={
                `like-btn btn w-10 me-1 
                ${likedByLoggedInUser == 0 ? "user-liked" : ""}`
            }
            onClick={() => { likeHandler(); }}
        >
            Likes {likes}
        </button>
    )
};

export default LikeBtn;