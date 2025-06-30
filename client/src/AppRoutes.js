import { Route, Routes } from 'react-router-dom';

import PageNotFound from './Components/Shared/PageNotFound';
import Profile from './Components/Auth/Profile/Profile';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import UpsertRecipe from './Components/Recipe/UpsertRecipe/UpsertRecipe';

const AppRoutes = () => {
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/recipe/add' element={<UpsertRecipe />} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>
};

export default AppRoutes;