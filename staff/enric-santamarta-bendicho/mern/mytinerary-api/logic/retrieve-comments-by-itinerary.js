const commentsModel = require('../models/commentModel')


module.exports = async (itineraryId) => {
  const comments = await commentsModel.find({ itineraryId },
    { "_id": false, "__v": false, "itineraryId": false }).populate('user', '-_id -favorites -email -password -__v')

  if (!comments) throw new Error(`itinerary with id ${itineraryId} not found`)

  return comments
}