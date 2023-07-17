const initialState = {
    user:[],
    registerIn:false,
    loggedIn:false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'REGISTER_USER': {
            return {
                ...state,
                registerIn:true
            }
        }
        case 'REGISTER_USER_ERROR': {
            return {
                ...state,
                error: action.payload
            }
        }
        case 'USER_AUTHENTICATED': {
            return {
                ...state,
                loggedIn: true
            }
        }
        case 'USER_AUTHENTICATION_ERROR': {
            return {
                ...state,
                error: action.error
            }
        }
        case 'RETRIEVE_CURRENT_USER': {
            return{
                ...state,
                user:action.payload
            }
        }
        case 'LOGOUT_USER': {
            return{
                ...state,
                user:[],
                loggedIn:false
            }
        }
        default:
            return state
    }
}

export default userReducer