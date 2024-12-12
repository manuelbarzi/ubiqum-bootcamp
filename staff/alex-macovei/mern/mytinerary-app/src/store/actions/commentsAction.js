import retrieveComments from "../../logic/retrieve-comments-by-city";

export default function (cityId) {
    return (dispatch) => {
        retrieveComments(cityId)
            .then((comments) =>
                dispatch({
                    type: "RETRIEVE_COMMENTS",
                    payload: comments,
                }))
            .catch(error =>
                dispatch({
                    type: "RETRIEVE_COMMENTS_ERROR",
                    payload: error.message
                })
            )
    }
};