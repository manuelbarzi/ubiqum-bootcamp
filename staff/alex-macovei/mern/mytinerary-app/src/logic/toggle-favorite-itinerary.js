export default async function (token, itineraryId) {
    const response = await fetch("http://localhost:5000/itineraries/fav/" + itineraryId, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    if (response.ok) {
        return true
    }

    throw new Error('could not add to favorites')
}