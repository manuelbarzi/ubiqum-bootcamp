import axios from 'axios'

export default async function (email, password, picture) {
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
    if (typeof picture !== 'string') throw new TypeError(`${picture} is not a string`)

    return (async () => {
        const response = await axios.post("http://localhost:5000/accounts/register", { email, password, picture });

        if (response.status === 201) {
            return
        }

        throw new Error('could not register account')
    })()
}