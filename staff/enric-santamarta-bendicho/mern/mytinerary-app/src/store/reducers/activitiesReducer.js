const initialState = {
    activities:[]
}


function activitiesReducer(state = initialState, action) {
    switch (action.type) {
        case "RETRIEVE_ALL_ACTIVITIES": {
            return {
                ...state,
                activities: action.payload
            }
            
        }
        case "RETRIEVE_ACTIVITIES_ERROR":{
            return{
                ...state,
                error:action.payload
            }
        }
        default: return state
    }
}

export default activitiesReducer

