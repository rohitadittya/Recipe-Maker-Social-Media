import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../Redux/Actions/UserActions";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registeredUser = await dispatch(registerUser(registerForm));
        if (registeredUser?.user) {
            navigate('/user/profile');
        }
    };

    return (
        <div className="register-container container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 shadow p-4 bg-body-tertiary rounded">
                    <h2 className="mb-4 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={registerForm.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" value={registerForm.firstname} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" value={registerForm.lastname} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={registerForm.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={registerForm.password} onChange={handleChange} required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn main-btn">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;