export default function itineraryReducer(state = {}, action) {
  switch (action.type) {
    case "RETRIEVE_ITINERARIES": {
      return {
        ...state,
        itinerary: action.payload,
      };
    }
    case "RETRIEVE_ITINERARIES_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
