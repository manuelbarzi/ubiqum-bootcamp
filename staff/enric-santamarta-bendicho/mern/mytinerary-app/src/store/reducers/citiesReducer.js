const initialState = {
    cities: [],
    filteredCities:[]
}

function citiesReducer(state = initialState, action) {
    switch (action.type) {
        case "RETRIEVE_CITIES": {
            return {
                ...state,
                cities: action.payload
            }
        }
        case "RETRIEVE_CITIES_ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
        case "FILTER_CITIES": {
            return {
                ...state,
                filteredCities: action.payload
                
            }
        }
        case "FILTER_CITIES_ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state
    }
}

export default citiesReducer




