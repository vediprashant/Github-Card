import validateUser from "./utils/validateUser";
import handleTokens from "./utils/handleTokens";
function setError() {
  return { type: "SET_ERROR" };
}
function unsetError() {
  return { type: "UNSET_ERROR" };
}
function loading() {
  return { type: "LOADING" };
}

function validatingUser(token, userName) {
  return async (dispatch) => {
    dispatch(loading());
    const jsonData = await validateUser(token);
    if (jsonData.message || jsonData.login !== userName) {
      dispatch(loading());
      dispatch(setError());
    } else {
      dispatch(loading());
      dispatch(unsetError());
      handleTokens.addToken("token", token);
      handleTokens.addToken("user", userName);
      dispatch({
        type: "SET_DATA",
        payload: {
          userData: jsonData,
          userName,
        },
      });
      dispatch({ type: "LOGGED_IN" });
    }
  };
}
export default validatingUser;
