import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../Redux/Actions/UserActions";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userInfo);

    const [profileForm, setProfileForm] = useState({ ...userData });

    const handleChange = (e) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = await dispatch(updateProfile(profileForm));
        if (updatedProfile?.user) {
            navigate('/');
        }
    };

    return (
        <div className="profile-container container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 shadow p-4 bg-body-tertiary rounded">
                    <h2 className="mb-4 text-center">Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="username" className="form-control" id="username" name="username" value={profileForm.username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input type="firstname" className="form-control" id="firstname" name="firstname" value={profileForm.firstname} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input type="lastname" className="form-control" id="lastname" name="lastname" value={profileForm.lastname} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn main-btn">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;