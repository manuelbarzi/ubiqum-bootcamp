const accountModel = require('../model/account-model')

module.exports = function(id) {
    return accountModel.findOne({_id: id})
}