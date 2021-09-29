const mongoose = require('mongoose')

const { ObjectId } = mongoose

const itinerarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    price: {
        type: Number,
        required: true,
        unique: true
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },

    rating: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        required: true,
        unique: true,
    },

    city: {
        type: ObjectId,
        required: true,
        ref: 'City'
    }
})

module.exports = mongoose.model('Itinerary', itinerarySchema)