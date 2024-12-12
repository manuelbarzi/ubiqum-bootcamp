import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer"
import registerReducer from "./registerReducer"
import loginReducer from "./loginReducer"
import accountReducer from "./accountReducer"
import favoritesItineraryReducer from "./favoritesItineraryReducer"
import commentsReducer from "./commentsReducer"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itinerary: itineraryReducer,
    register: registerReducer,
    login: loginReducer,
    account: accountReducer,
    favorites: favoritesItineraryReducer,
    comments: commentsReducer
});

export default rootReducer;