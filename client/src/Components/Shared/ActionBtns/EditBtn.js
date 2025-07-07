import { useNavigate } from "react-router-dom";

const EditBtn = (props) => {
    const { _id } = props?.recipe;
    const navigate = useNavigate();

    const editHandler = () => {
        navigate(`/recipe/post?recipeId=${_id}`);
    };

    return (
        <button
            className="edit-btn btn w-10 ms-1"
            onClick={() => { editHandler(); }}
        >
            Edit
        </button>
    )
};

export default EditBtn;