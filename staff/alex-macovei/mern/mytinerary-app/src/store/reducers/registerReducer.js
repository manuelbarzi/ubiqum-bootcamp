export default function registerReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_ACCOUNT':
            return {user: action.user};
        case 'ADD_ACCOUNT_ERROR':
            return {error: action.payload};
        default:
            return state;
    }
}