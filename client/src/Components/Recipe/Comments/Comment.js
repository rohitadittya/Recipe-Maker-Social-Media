import { useDispatch } from "react-redux";
import { commentOnRecipe, getAllCommentsForRecipe } from "../../../Redux/Actions/RecipeActions";
import { useEffect, useState } from "react";
import LikeBtn from "../../Shared/ActionBtns/LikeBtn";
import "./Comment.css"

const Comment = (props) => {
    const { _id } = props?.recipe;
    const [comments, setComments] = useState([]);
    const [newComment, addNewComment] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (_id != null) {
            (async () => {
                const freshComments = await dispatch(getAllCommentsForRecipe(_id));
                if (!Object.hasOwn(freshComments, 'error')) {
                    setComments(freshComments);
                }
            })();
        }
    }, [_id, dispatch]);

    const handleCommentChange = (e) => {
        addNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        if (newComment.trim() !== "") {
            const commentPayload = {
                comment: newComment,
                recipeId: _id
            };

            const freshComments = await dispatch(commentOnRecipe(commentPayload));
            if (!Object.hasOwn(freshComments, 'error')) {
                addNewComment("");
                setComments(freshComments);
            }
        }
    };

    const commentTemplate = comments?.length != 0 ? comments?.map((comment) => (
        <li key={comment._id} className="comment-list-items list-group-item">
            <div className="d-flex justify-content-between">
                <p className="mb-1">{comment.comment}</p>
                <small className="text-muted">
                    {new Date(comment.createdTimeStamp).toLocaleString()}
                </small>
            </div>
            <small className="text-muted">User: {comment.userId}</small>
        </li>
    )) : <p className="text-muted">No comments yet. Be the first to comment!</p>;

    return (
        <div className="comment-container shadow rounded container mt-2 p-4">
            <h5 className="mb-4 border-bottom pb-2">Comments</h5>

            <div className="comment-textarea-grp mb-4">
                <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows="4"
                    onChange={handleCommentChange}
                    value={newComment}
                ></textarea>

                <div className="d-flex justify-content-start mt-2">
                    <LikeBtn recipe={props?.recipe} />
                    <button className="comment-btn btn btn-primary" onClick={handleCommentSubmit} value={newComment}>
                        Comment
                    </button>
                </div>
            </div>

            <ul className="comment-template list-group">
                {commentTemplate}
            </ul>
        </div>

    );
};

export default Comment;