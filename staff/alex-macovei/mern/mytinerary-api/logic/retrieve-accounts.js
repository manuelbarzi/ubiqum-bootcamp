const accountModel = require('../model/account-model')

module.exports = function() {
    return accountModel.find({})
}