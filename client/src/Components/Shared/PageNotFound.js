import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="container d-flex align-items-center justify-content-center">
            <div className="text-center mt-5">
                <h1 className="display-4 text-danger">Oops! Page not found</h1>
                <p className="lead">The page you're looking for doesn't exist.</p>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default PageNotFound;