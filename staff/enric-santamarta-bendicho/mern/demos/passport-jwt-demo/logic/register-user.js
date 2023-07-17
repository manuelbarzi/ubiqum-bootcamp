const { User } = require('../models')
const bcrypt = require('bcryptjs')

module.exports = (name, email, password) => {
    if (typeof name !== 'string') throw new TypeError(`${name} is not a string`)
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)

    return (async () => {
        const hash = await bcrypt.hash(password, 8)

        await User.create({ name, email, password: hash })
    })()
}