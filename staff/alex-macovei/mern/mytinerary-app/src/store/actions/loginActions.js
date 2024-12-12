import loginAccount from "../../logic/login-account";

export default function loginUserAccount(email, password) {
  return (dispatch) => {
    loginAccount(email, password)
      .then(token => {
        sessionStorage.token = token
        
        dispatch({
          type: "LOGIN_ACCOUNT",
          payload: token
        })
      })
      .catch(error =>
        dispatch({
          type: "LOGIN_ACCOUNT_ERROR",
          payload: error.message
        })
      );
  }
};