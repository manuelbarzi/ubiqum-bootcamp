const mongoose = require('mongoose')

const { ObjectId } = mongoose

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    country: {
        type: String,
        required: true,
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('City', citySchema)