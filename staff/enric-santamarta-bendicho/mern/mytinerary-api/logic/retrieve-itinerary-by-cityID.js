const itineraryModel = require('../models/itineraryModel')

module.exports = cityID => itineraryModel.find({ cityID }, { "__v": false })
    .populate({ path: 'comments', select: '-__v -_id -itineraryId', populate: { path: 'user', select: '-_id -favorites -email -password -__v' } })
