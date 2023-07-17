export default function retrieveAllCities () {
    return fetch('http://localhost:5000/cities/all')
        .then(response => response.json())
}