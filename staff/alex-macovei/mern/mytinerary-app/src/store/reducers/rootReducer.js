import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer"
import registerReducer from "./registerReducer"
import loginReducer from "./loginReducer"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itinerary: itineraryReducer,
    register: registerReducer,
    login: loginReducer,
});

export default rootReducer;