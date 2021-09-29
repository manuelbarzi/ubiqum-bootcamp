export default async function(cityId) {
    const response = await fetch("http://localhost:5000/itineraries/" + cityId)
    
    if (response.ok) {
        const itineraries = await response.json();

        return itineraries
    }

    throw new Error('could not retrieve any itinerary')
}