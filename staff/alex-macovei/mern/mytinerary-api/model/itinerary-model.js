const mongoose = require('mongoose')

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
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('itinerary', itinerarySchema)