import actions from "./Actions";

const initialState = {
  loggedIn: false,
  userData: {},
  userName: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actions.LOGGED_OUT:
      return {
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

export default reducer;
