export default function retrieveItineraryByCityID(cityID) {
    return fetch ('http://localhost:5000/itineraries/' + cityID)
        .then(response => response.json())
}