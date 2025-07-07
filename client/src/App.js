import './App.css';
import Navbar from './Components/Shared/Navbar';
import PageNotFound from './Components/Shared/PageNotFound';
import Profile from './Components/Auth/Profile/Profile';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import UpsertRecipe from './Components/Recipe/UpsertRecipe/UpsertRecipe';
import { Route, Routes } from 'react-router-dom';
import PublicFeed from './Components/Recipe/RecipeFeed/PublicFeed';
import UserRecipeFeed from './Components/Recipe/RecipeFeed/UserRecipeFeed';
import SelectedRecipe from './Components/Recipe/SelectedRecipe/SelectedRecipe';
import LoaderComp from './Components/Shared/Loading';
import { setErrorHandler, setLoadingHandler } from './Utils/Api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './Redux/Selectors/UserSelector';
import { useAuthGuard } from './Hooks/useAuthGuard';
import { fetchLoggedUserByToken } from './Redux/Actions/UserActions';
import Toast from './Components/Shared/Toast';
import { TOAST_TYPE } from './Utils/Constants';
import { istokenExpired } from './Utils/Utils';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isTokenExpired = istokenExpired();

  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(getUserInfo);
  useAuthGuard();

  useEffect(() => {
    if (isUserLoggedIn == null && !isTokenExpired) {
      dispatch(fetchLoggedUserByToken());
    }
  }, [isUserLoggedIn, isTokenExpired]);

  useEffect(() => {
    setLoadingHandler(setLoading);
    setErrorHandler(setError);
  }, []);

  const resetError = () => setError("");

  const appRoutes = (
    <Routes>
      <Route path='/' element={<PublicFeed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/user/profile' element={<Profile />} />
      <Route path='/recipe/:id' element={<SelectedRecipe />} />
      <Route path='/recipe/self' element={<UserRecipeFeed />} />
      <Route path='/recipe/post' element={<UpsertRecipe />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );

  return (
    <div className="App">
      <Navbar />
      {error && <Toast message={error} toastType={TOAST_TYPE.ERROR} resetErrFn={resetError} />}
      {loading && <LoaderComp />}
      {appRoutes}
    </div>
  );
}

export default App;
