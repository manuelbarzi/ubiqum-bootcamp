export default function loginReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_ACCOUNT':
            return {token: action.payload};
        case 'LOGIN_ACCOUNT_ERROR':
            return {error: action.payload};
        default:
            return state;
    }
}