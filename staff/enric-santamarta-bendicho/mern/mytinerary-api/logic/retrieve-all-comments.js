const commentModel = require('../models/commentModel')

module.exports = () => commentModel.find({}, { "_id": false, "__v": false })
    .populate('user', '-_id -favorites -email -password -__v')
    .populate('itineraryId', '-_id -cityId -hashtags -comments -cityID')