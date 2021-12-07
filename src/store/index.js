import { createStore, combineReducers } from "redux";
import authReducer from "./deducers/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);
export default store;
