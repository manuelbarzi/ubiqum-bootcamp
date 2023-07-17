export default function isUserLoggedIn() {
    return !! localStorage.token
}