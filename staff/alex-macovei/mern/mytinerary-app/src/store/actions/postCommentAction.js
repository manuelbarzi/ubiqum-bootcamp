import postComment from "../../logic/post-comment";

export default function (name, comment, cityId) {
    return (dispatch) => {
        postComment(name, comment, cityId)
            .then(() =>
                dispatch({
                    type: "POST_COMMENT",
                    payload: { name, comment, cityId }
                }))
            .catch(error =>
                dispatch({
                    type: "POST_COMMENT_ERROR",
                    payload: error.message
                })
            );
    }
};