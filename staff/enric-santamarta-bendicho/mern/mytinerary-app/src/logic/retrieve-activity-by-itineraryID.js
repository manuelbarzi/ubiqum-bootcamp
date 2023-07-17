export default function retrieveActivityByItineraryID(itineraryID) {
    return fetch ('http://localhost:5000/activities/' + itineraryID)
        .then(response => response.json())
}