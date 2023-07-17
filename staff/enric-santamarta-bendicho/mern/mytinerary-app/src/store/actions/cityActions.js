import retrieveAllCities from '../../logic/retrieve-all-cities'

export const retrieveCities = () =>
    (dispatch) => {
        retrieveAllCities()
            .then((cities) =>
                dispatch({
                    type: "RETRIEVE_CITIES",
                    payload: cities
                }))
            .catch(error =>
                dispatch({
                    type: "RETRIEVE_CITIES_ERROR",
                    payload: error.message
                }))
    }

export const handleFilterCities = (filter) => (dispatch) => {
    retrieveAllCities()
        .then(cities => {
            const filteredCities = cities.filter(city => city.name.toLowerCase().startsWith(filter.toLowerCase()))

            dispatch({
                type: "FILTER_CITIES",
                payload: filteredCities
            })
        })
        .catch(error => {
            dispatch({
                type: "FILTER_CITIES_ERROR",
                payload: error.message
            })

        })

}