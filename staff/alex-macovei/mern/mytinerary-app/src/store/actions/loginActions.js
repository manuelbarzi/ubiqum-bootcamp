import loginAccount from "../../logic/login-account";

export default function loginUserAccount(email, password) {
  return (dispatch) => {
    loginAccount(email, password,)
      .then(() =>
        dispatch({
          type: "LOGIN_ACCOUNT",
          payload: { email, password,}
        }))
      .catch(error =>
        dispatch({
          type: "POST_LOGIN_ERROR",
          payload: error.message
        })
      );
  }
};