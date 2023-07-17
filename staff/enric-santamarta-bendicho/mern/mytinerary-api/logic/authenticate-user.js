const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')


module.exports = (email, password) => {
    if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)


    return (async () => { // TODO RTFM promises (vs async-await)
        const user = await userModel.findOne({ email })

        if (user) {
            const pass = await bcrypt.compare(password, user.password)
            
            if (!pass) throw new Error('Wrong password')

            return user.id
        } else throw new Error(`Account with email ${email} does not exist`)
    })()
}