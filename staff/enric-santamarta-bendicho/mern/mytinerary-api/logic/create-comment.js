const itineraryModel = require('../models/itineraryModel')
const userModel = require('../models/userModel')
const commentModel = require('../models/commentModel')

module.exports = async (comment, userId, itineraryId) => {
    if (typeof comment !== 'string') throw new TypeError(`${comment} is not a string`)
    if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
    if (typeof itineraryId !== 'string') throw new TypeError(`${itineraryId} is not a string`)

    const itinerary = await itineraryModel.findById(itineraryId)

    if (!itinerary) throw new Error(`user with id ${itineraryId} not found`)

    const user = await userModel.findById(userId)

    if (!user) throw new Error(`itinerary with id ${userId} not found`)

    var newComment = new commentModel ({ comment: comment, user: userId, itineraryId: itineraryId})

    await newComment.save()
    await itinerary.comments.push(newComment._id)
    await itinerary.save()
    return newComment

}