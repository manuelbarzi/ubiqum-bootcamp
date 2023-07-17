import axios from 'axios'

export default function (comment,itinerary) {
    if (typeof comment !== 'string') throw new TypeError(`${comment} is not a string`)
    const body = { comment: 'comment' , }

    return (async () => {
        try {
            await axios.post('http://localhost:5000/comments/' + itinerary + '/' + comment, body, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })

        } catch (error) {
            const { status } = error

            switch (true) {
                case status === 401:
                    throw new Error('wrong credentials')
                case status < 500:
                    throw new Error('client error')
                case status >= 500:
                    throw new Error('server error')
            }
        }
    })()
}
