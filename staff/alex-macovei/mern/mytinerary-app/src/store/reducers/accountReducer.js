export default function retrieveAccount(state = {}, action) {
    switch (action.type) {
        case 'RETRIEVE_ACCOUNT':
            return {account: action.payload};
        case 'RETRIEVE_ACCOUNT_ERROR':
            return {error: action.payload};
        default:
            return state;
    }
}