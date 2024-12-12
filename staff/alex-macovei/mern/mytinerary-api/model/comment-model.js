const mongoose = require('mongoose')
const { ObjectId } = mongoose

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    },

    cityId: {
        type: ObjectId,
        ref: 'City'
    }
})

module.exports = mongoose.model('Comment', commentSchema)