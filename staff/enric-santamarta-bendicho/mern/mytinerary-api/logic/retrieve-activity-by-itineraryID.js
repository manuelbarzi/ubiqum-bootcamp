const activityModel = require('../models/activityModel')

module.exports = itineraryID => activityModel.find({ itineraryID })