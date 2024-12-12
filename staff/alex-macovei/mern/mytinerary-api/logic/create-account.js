const bcrypt = require('bcrypt');

const accountModel = require('../model/account-model')

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /\b(https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/

module.exports = function (email, password, picture) {
    if (typeof email !== 'string') throw new TypeError(`${email} ìs not a string`)
    if (!EMAIL_REGEX.test(email)) throw new Error(`${email} is not a valid e-mail`)

    if (typeof password !== 'string') throw new TypeError(`${password} ìs not a string`)
    if (password.length < 8) throw new Error('password length is lower than 8')

    if (typeof picture !== 'string') throw new TypeError(`${picture} ìs not a string`)
    if (!URL_REGEX.test(picture)) throw new Error(`${picture} is not a valid URL`)

    return (async () => { // TODO RTFM async-await
        const account = await accountModel.findOne({ email })

        if (account)
            throw new Error(`user with email ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        const newAccount = new accountModel({
            email,
            password: hash,
            picture,
        })

        await newAccount.save()
    })() 
}