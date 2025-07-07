import { combineReducers } from "redux";
import RecipeReducer from "./RecipeReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
    user: UserReducer,
    recipes: RecipeReducer,
});

export default RootReducer;
