import axios from 'axios'

export default async function (email, password) {
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)

    return (async () => {
        const response = await axios.get("http://localhost:5000/accounts/login", { email, password });

        if (response.status === 201) {
            return
        }

        throw new Error('could not register account')
    })()
}