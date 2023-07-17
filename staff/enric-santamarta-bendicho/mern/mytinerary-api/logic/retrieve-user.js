const userModel = require('../models/userModel')

module.exports = id => {
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    return (async () => {
        const user = await userModel.findById(id).lean()

        if (!user) throw new Error(`user with id ${id} not found`)

        user.id = user._id.toString()
        delete user._id
        delete user.password
        delete user.__v

        return user
    })()
}