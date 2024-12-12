const initialState = {
    cities: []
  };
  
  export default function cityReducer(state = initialState, action) {
    switch (action.type) {
      case "RETRIEVE_CITIES": {
        return {
          ...state,
          cities: action.payload,
        };
      }
      case "RETRIEVE_CITIES_ERROR": {
        return {
          ...state,
          error: action.payload,
        };
      }
      default:
        return state;
    }
  }