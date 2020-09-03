import validateUser from "./utils/validateUser";
import handleTokens from "./utils/handleTokens";
import actions from "./Actions";
import KEYS from "./Constants/keyConstants";

function setError() {
  return { type: actions.SET_ERROR };
}
function unsetError() {
  return { type: actions.UNSET_ERROR };
}
function loading() {
  return { type: actions.LOADING };
}
function errorHandler() {
  return { type: actions.SET_API_ERROR };
}

function validatingUser(token, userName) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const jsonData = await validateUser(token);
      if (jsonData.message || jsonData.login !== userName) {
        dispatch(loading());
        dispatch(setError());
      } else {
        dispatch(loading());
        dispatch(unsetError());
        handleTokens.addToken(KEYS.TOKEN, token);
        handleTokens.addToken(KEYS.USER, userName);
        dispatch({
          type: actions.SET_DATA,
          payload: {
            userData: jsonData,
            userName,
          },
        });
        dispatch({ type: actions.LOGGED_IN });
      }
    } catch {
      dispatch(unsetError());
      dispatch(loading());
      dispatch(errorHandler());
    }
  };
}
export default validatingUser;
