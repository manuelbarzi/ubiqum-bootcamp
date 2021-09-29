const initialState = {
    favoriteItineraries: []
};

export default function favoritesItineraryReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: action.payload,
            };
        case 'ADD_FAVORITE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}