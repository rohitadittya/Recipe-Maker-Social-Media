import { useDispatch } from "react-redux";
import { deleteARecipe } from "../../../Redux/Actions/RecipeActions";

const DeleteBtn = (props) => {
    const { _id } = props?.recipe;
    const dispatch = useDispatch();

    const deleteHandler = async () => {
        const errOnDelete = await dispatch(deleteARecipe(_id));
        if (errOnDelete?.error) {
            return;
        }
    };

    return (
        <button
            className="delete-btn btn w-10 ms-1"
            onClick={() => {
                deleteHandler();
            }}
        >
            Delete
        </button>
    )
};

export default DeleteBtn;