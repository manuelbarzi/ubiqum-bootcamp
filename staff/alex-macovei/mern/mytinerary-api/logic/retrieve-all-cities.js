const cityModel = require('../model/city-model')

module.exports = function() {
    return cityModel.find({})
}