import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { loginUser } from '../../../Redux/Actions/UserActions';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser(loginForm))
        if (res?.user) {
            navigate('/user/profile');
        }
    };

    return (
        <div className="login-container container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 shadow p-4 bg-body-tertiary rounded">
                    <h2 className="mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={loginForm.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={loginForm.password} onChange={handleChange} required />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn main-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;