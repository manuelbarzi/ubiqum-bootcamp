const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    itineraryId: [{
        type: Schema.Types.ObjectId,
        ref: 'itinerary'
    }]
})

//name of module is the singular version (comment) of the database name (comments)
module.exports = mongoose.model('comment', commentSchema)