import * as actionTypes from '../ActionTypes/UserActionType';

const initialState = {
    userInfo: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: {
            return {
                ...state,
                userInfo: action.payload,
            };
        }

        case actionTypes.UNSET_USER: {
            return {
                ...state,
                userInfo: null,
            }
        }

        case actionTypes.UPDATE_USER_PROFILE: {
            return {
                ...state,
                userInfo: action.payload,
            }
        }

        default:
            return state;
    }
};

export default UserReducer;