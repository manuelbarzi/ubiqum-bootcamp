const { User } = require('../models')

module.exports = id => {
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user)  throw new Error(`user with id ${id} not found`)

        delete user._id
        delete user.password
        delete user.__v

        return user
    })()
}