import { useNavigate } from "react-router-dom";

const CommentBtn = (props) => {
    const { _id } = props?.recipe;
    const navigate = useNavigate();

    const commentHandler = () => {
        navigate(`/recipe/${_id}`)
    };


    return (
        <button
            className="comment-btn btn w-10 ms-1"
            onClick={() => { commentHandler(); }}
        >
            Comment
        </button>
    )
};

export default CommentBtn;