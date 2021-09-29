const commentModel = require('../model/comment-model')

module.exports = function(cityId) {
    return commentModel.find({cityId})
}