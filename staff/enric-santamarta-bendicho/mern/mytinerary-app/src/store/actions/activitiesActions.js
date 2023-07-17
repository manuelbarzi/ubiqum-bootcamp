import retrieveActivitiesByItineraryID from '../../logic/retrieve-activity-by-itineraryID'

export function retrieveActivities(itineraryID) {
    return dispatch => {
         retrieveActivitiesByItineraryID(itineraryID)
             .then((activities) =>
                 dispatch({
                     type: "RETRIEVE_ALL_ACTIVITIES",
                     payload: activities
                 }))
             .catch(error =>
                 dispatch({
                     type: "RETRIEVE_ACTIVITIES_ERROR",
                     payload: error.message
                 }))
     }
 }