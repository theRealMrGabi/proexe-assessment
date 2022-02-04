import { combineReducers } from "redux";
import user from "./user.reducer";

const rootReducer = combineReducers({
	user,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
