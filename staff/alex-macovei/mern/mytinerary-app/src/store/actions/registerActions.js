import registerAccount from "../../logic/register-account";

export default function registerUserAccount(email, password, picture) {
  return (dispatch) => {
    registerAccount(email, password, picture)
      .then(() =>
        dispatch({
          type: "ADD_ACCOUNT",
          payload: { email, password, picture }
        }))
      .catch(error =>
        dispatch({
          type: "POST_ACCOUNT_ERROR",
          payload: error.message
        })
      );
  }
};