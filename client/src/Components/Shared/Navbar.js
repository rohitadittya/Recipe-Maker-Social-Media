import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="container-fluid" id="navbarNav">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/recipe/post" className="nav-link">Post Recipe</NavLink>
                        </li>
                        <li className="nav-item ms-auto">
                            <NavLink to="/user/profile" className="nav-link">Profile</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;