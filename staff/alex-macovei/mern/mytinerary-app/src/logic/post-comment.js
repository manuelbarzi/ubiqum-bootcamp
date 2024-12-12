export default async function (name, comment, cityId) {
    const response = await fetch("http://localhost:5000/cities/comments/" + cityId, {
        method: 'POST',
        headers: {
            name,
            comment,
        }
    });

    if (response.ok) {
        return true
    }

    throw new Error('could not post the comment')
}