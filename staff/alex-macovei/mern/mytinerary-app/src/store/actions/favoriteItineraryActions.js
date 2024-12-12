import addFavoriteItinerary from "../../logic/toggle-favorite-itinerary.js";

export default function (token, favoriteId) {
    return (dispatch) => {
      addFavoriteItinerary(token, favoriteId)
        .then(token => {
          dispatch({
            type: "ADD_FAVORITE",
            payload: {token, favoriteId}
          })
        })
        .catch(error =>
          dispatch({
            type: "ADD_FAVORITE_ERROR",
            payload: error.message
          })
        );
    }
  };