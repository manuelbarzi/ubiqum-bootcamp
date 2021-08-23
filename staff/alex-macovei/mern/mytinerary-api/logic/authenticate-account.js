const bcrypt = require('bcrypt')
const accountModel = require('../model/account-model')


const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = function (email, password) {
    if (typeof email !== 'string') throw new TypeError(`${email} ìs not a string`)
    if (!EMAIL_REGEX.test(email)) throw new Error(`${email} is not a valid e-mail`)

    if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
    if (password.length < 8) throw new Error('The password You entered is too short')


    return (async () => { // TODO RTFM promises (vs async-await)
        const account = await accountModel.findOne({ email })

        if (account) {
            const pass = await bcrypt.compare(password, account.password)
            
            if (!pass) throw new Error('Wrong credentials')

            return account.id
        } else throw new Error(`Account with email |${email}| does not exist`)
    })()
}