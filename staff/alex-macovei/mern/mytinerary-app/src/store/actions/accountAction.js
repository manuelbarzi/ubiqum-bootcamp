import retrieveAccount from '../../logic/retrieve-account'

export default function(token) {
  return (dispatch) => {
    retrieveAccount(token)
      .then((account) =>
        dispatch({
          type: "RETRIEVE_ACCOUNT",
          payload: account,
        }))
      .catch(error =>
        dispatch({
          type: "RETRIEVE_ACCOUNT_ERROR",
          payload: error.message
        })
      );
    }
  };