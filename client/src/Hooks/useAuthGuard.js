import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Actions/UserActions';
import { useNavigate } from 'react-router-dom';
import { getTokenExpiration } from '../Utils/Utils';

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = getTokenExpiration();

    if (expiry && expiry > 0) {
      const timerId = setTimeout(() => {
        dispatch(logoutUser());
        navigate("/login");
      }, expiry);
      return () => clearTimeout(timerId);
    }
    else {
      dispatch(logoutUser());
      navigate("/login");
    }
  }, [dispatch]);
};
