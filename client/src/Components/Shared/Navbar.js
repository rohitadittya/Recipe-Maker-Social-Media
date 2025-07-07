import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../Redux/Selectors/UserSelector";
import { logoutUser } from "../../Redux/Actions/UserActions";

const Navbar = () => {
    const isLoggedIn = useSelector(isUserLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const publicRoutes = (
        <>
            <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
        </>
    );

    const protectedRoutes = (
        <>
            <li className="nav-item">
                <NavLink to="/" className="nav-link">Recipes</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/recipe/self" className="nav-link">My Recipes</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/recipe/post" className="nav-link">Post Recipe</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/user/profile" className="nav-link">Profile</NavLink>
            </li>
            <li className="nav-item">
                <span className="nav-link logout-link" onClick={logoutHandler}>
                    Logout
                </span>
            </li>
        </>
    );
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <Link to="/" className="navbar-brand">
                        <img className="logo" src="assets/images/logo.jpeg" alt="Logo" />
                    </Link>
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? protectedRoutes : publicRoutes}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;