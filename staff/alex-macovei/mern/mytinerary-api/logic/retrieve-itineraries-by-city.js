const itineraryModel = require('../model/itinerary-model')

module.exports = function (cityId) {
    return itineraryModel.find({ city: cityId })
}