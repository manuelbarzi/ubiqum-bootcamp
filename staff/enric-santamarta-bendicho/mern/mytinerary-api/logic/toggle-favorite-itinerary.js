const userModel = require('../models/userModel')
const itineraryModel = require('../models/itineraryModel');


module.exports = async (userId, itineraryId) => {
    if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
    if (typeof itineraryId !== 'string') throw new TypeError(`${itineraryId} is not a string`)

    const user = await userModel.findById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const favorite = await itineraryModel.findById(itineraryId)

    if (!favorite) throw new Error(`itinerary with id ${itineraryId} not found`)

    const index = user.favorites.findIndex(_id => _id.toString() === itineraryId)

    if (index > -1)
        user.favorites.splice(index, 1)
    else
        user.favorites.push(itineraryId)

    await user.save()
    return user
}

