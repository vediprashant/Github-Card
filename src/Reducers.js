import { combineReducers } from "redux";
import actions from "./Actions";

const initialState = {
  loggedIn: false,
  userData: {},
  userName: null,
  isLoading: false,
  isError: false,
};

function logger(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actions.LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
        userData: {},
        userName: null,
      };
    case actions.SET_DATA:
      return {
        ...state,
        userData: action.payload.userData,
        userName: action.payload.userName,
      };
    default:
      return state;
  }
}
function loader(state = initialState, action) {
  switch (action.type) {
    case actions.LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        isError: true,
      };
    case actions.UNSET_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({ logger, loader });
export default rootReducer;
