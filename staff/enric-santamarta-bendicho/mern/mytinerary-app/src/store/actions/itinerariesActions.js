import retrieveItinerariesByCityID from '../../logic/retrieve-itinerary-by-cityID'
import addUserFavorites from '../../logic/add-user-favorites'
import sendTheComment from '../../logic/send-comment'


export function retrieveItineraries(cityID) {
    return dispatch => {
        retrieveItinerariesByCityID(cityID)
            .then((itineraries) =>
                dispatch({
                    type: "RETRIEVE_ALL_ITINERARIES",
                    payload: itineraries
                }))
            .catch(error =>
                dispatch({
                    type: "RETRIEVE_ITINERARIES_ERROR",
                    payload: error.message
                }))
    }
}

export function addToFavorites(itineraryId) {
    return dispatch => {
        addUserFavorites(itineraryId)
            .then(() =>
                dispatch({
                    type: "ADD_TO_USER_FAVORITES"
                }))
            .catch(error =>
                dispatch({
                    type: "ADD_TO_USER_FAVORITES_ERROR",
                    payload: error.message
                }))
    }
}

export function sendComment(comment,itinerary) {
    return dispatch => {
        sendTheComment(comment,itinerary)
            .then(() =>
                dispatch({
                    type: "SEND_COMMENT",
                    payload: comment
                }))
            .catch(error =>
                dispatch({
                    type: "SEND_COMMENT_ERROR",
                    payload: error.message
                }))
    }
}
