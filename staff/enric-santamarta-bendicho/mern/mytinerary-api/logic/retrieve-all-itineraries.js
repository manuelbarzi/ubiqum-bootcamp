const itineraryModel = require('../models/itineraryModel')
const commentModel = require('../models/commentModel')

module.exports = () => itineraryModel.find({})