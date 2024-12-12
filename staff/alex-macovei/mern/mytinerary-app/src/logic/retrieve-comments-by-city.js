export default async function(cityId) {
    const response = await fetch("http://localhost:5000/cities/comments/" + cityId)
    
    if (response.ok) {
        const comments = await response.json();

        return comments
    }

    throw new Error('could not retrieve any comment')
}