import retrieveItinerariesByCity from "../../logic/retrieve-itineraries-by-city";

export function retrieveItineraries(cityId) {
  return (dispatch) => {
    retrieveItinerariesByCity(cityId)
      .then((itinerary) =>
        dispatch({
          type: "RETRIEVE_ITINERARIES",
          payload: itinerary,
        })
      )
      .catch(error =>
        dispatch({
          type: "RETRIEVE_ITINERARIES_ERROR",
          payload: error.message
        })
      )
  }
};