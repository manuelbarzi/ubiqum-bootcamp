const { User } = require('../models')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user)  throw new Error(`no user with e-mail ${email} found`)

        const matches = await bcrypt.compare(password, user.password)

        if (!matches) throw new Error('wrong password')

        return user.id
    })()
}