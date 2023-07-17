const initialState = {
    itineraries:[]
}


function itinerariesReducer(state = initialState, action) {
    switch (action.type) {
        case "RETRIEVE_ALL_ITINERARIES": {
            return {
                ...state,
                itineraries: action.payload
            }
            
        }
        case "RETRIEVE_ITINERARIES_ERROR":{
            return{
                ...state,
                error:action.payload
            }
        }
        case "ADD_TO_USER_FAVORITES":{ 
            return{
                ...state
            }
        }
        case "ADD_TO_USER_FAVORITES_ERROR":{
            return{
                ...state,
                error:action.payload
            }
        }
        case "SEND_COMMENT":{ 
            return{
                ...state
            }
        }
        case "SEND_COMMENT_ERROR":{
            return{
                ...state,
                error:action.payload
            }
        }
        default: return state
    }
}

export default itinerariesReducer