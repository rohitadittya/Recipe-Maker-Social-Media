import { useNavigate } from "react-router-dom";

const NoRecipeFound = () => {
    const navigate = useNavigate();
    return (
        <div className="no-recipe-found-container container d-flex align-items-center justify-content-center">
            <div className="text-center mt-5">
                <h1 className="display-4 text-danger">Oops! No Recipe Found</h1>
                <p className="lead">Try creating a new one or check the feed.</p>
                <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
                        Go Home
                    </button>
                    <button className="btn btn-outline-success mt-3" onClick={() => navigate('/recipe/post')}>
                        Post a recipe :)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoRecipeFound;
