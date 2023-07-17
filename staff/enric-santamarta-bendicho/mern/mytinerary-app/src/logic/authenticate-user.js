import axios from 'axios';
import { validateEmail } from '../utils'


export default function (email, password) {
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (!validateEmail(email)) throw new Error(`${email} is not an e-mail`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)

    return (async () => {
        try {
            const res = await axios.post('http://localhost:5000/users/auth', { email, password })
            // Save to localStorage
            // Set token to localStorage
            const token = res.data.token
            
            localStorage.token = token
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


