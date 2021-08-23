const itineraryModel = require('../model/itinerary-model')

module.exports = function(city) {
    return itineraryModel.findOne({city})
}