import { combineReducers } from "redux";
import actions from "./Actions";

const initialState = {
  loggedIn: false,
  userData: {},
  isLoading: false,
  isError: false,
  apiError: false,
};

function currentUser(state = initialState, action) {
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
      };
    case actions.SET_DATA:
      return {
        ...state,
        userData: action.payload.userData,
      };
    default:
      return state;
  }
}
function fetchUser(state = initialState, action) {
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
    case actions.SET_API_ERROR:
      return {
        ...state,
        apiError: true,
      };
    case actions.UNSET_API_ERROR:
      return {
        ...state,
        apiError: false,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({ currentUser, fetchUser });
export default rootReducer;
