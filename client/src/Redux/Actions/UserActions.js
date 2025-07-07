import httpClient from "../../Utils/Api";
import { SESSION_STORAGE_KEYS } from "../../Utils/Constants";
import { EndPoints } from "../../Utils/EndPoints";
import * as userAction from '../ActionTypes/UserActionType';
import * as recipeAction from '../ActionTypes/RecipeActionType';

const setTokenInSessionStorage = (token) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.JWT_TOKEN, token);
}

const removeTokenFromSessionStorage = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.JWT_TOKEN);
};

const loginUser = (userData) => async (dispatch) => {
    try {
        const loggedUser = await httpClient(EndPoints.user.login, "POST", userData);

        dispatch({
            type: userAction.SET_USER,
            payload: loggedUser.user
        });

        setTokenInSessionStorage(loggedUser.authToken);
        return loggedUser;
    }
    catch (error) {
        console.error("Error logging in User:", error);
        removeTokenFromSessionStorage();
        dispatch({
            type: userAction.UNSET_USER,
        });
    }
};

const fetchLoggedUserByToken = () => async (dispatch) => {
    try {
        const loggedUser = await httpClient(EndPoints.user.getLoggedInUser);

        dispatch({
            type: userAction.SET_USER,
            payload: loggedUser
        });

        return loggedUser;
    }
    catch (error) {
        console.error("Error fetching logged-in User details:", error);
        removeTokenFromSessionStorage();
        dispatch({
            type: userAction.UNSET_USER,
        });
    }
};

const registerUser = (userData) => async (dispatch) => {
    try {
        const registeredUser = await httpClient(EndPoints.user.register, "POST", userData);

        dispatch({
            type: userAction.SET_USER,
            payload: registeredUser.user
        });

        setTokenInSessionStorage(registeredUser.authToken);

        return registeredUser;
    }
    catch (error) {
        console.error("Error registering User:", error);
        removeTokenFromSessionStorage();
    }
};

const updateProfile = (userData) => async (dispatch) => {
    try {
        const updatedUser = await httpClient(EndPoints.user.update, "PUT", userData);

        dispatch({
            type: userAction.UPDATE_USER_PROFILE,
            payload: updatedUser,
        });

        return updatedUser;
    }
    catch (error) {
        console.error("Error updating the user profile:", error);
    }
}

const logoutUser = () => (dispatch) => {
    removeTokenFromSessionStorage();
    dispatch({
        type: userAction.UNSET_USER,
    });
    dispatch({
        type: recipeAction.REMOVE_ALL_RECIPES,
    });
};

export {
    loginUser,
    registerUser,
    updateProfile,
    logoutUser,
    fetchLoggedUserByToken
}