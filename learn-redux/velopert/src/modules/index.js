import { combineReducers } from "redux";
import counterSlice from "./counterSlice";
import todos from "./todos";

const rootReducer = combineReducers({
  counter: counterSlice,
  todos,
});

export default rootReducer;
