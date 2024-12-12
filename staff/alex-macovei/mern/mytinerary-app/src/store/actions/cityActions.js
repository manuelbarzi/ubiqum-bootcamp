import retrieveAllCities from "../../logic/retrieve-all-cities";

export const retrieveCities = () =>
  (dispatch) => {
    retrieveAllCities()
      .then((cities) =>
        dispatch({
          type: "RETRIEVE_CITIES",
          payload: cities,
        }))
      .catch(error =>
        dispatch({
          type: "RETRIEVE_CITIES_ERROR",
          payload: error.message
        })
      );
  };