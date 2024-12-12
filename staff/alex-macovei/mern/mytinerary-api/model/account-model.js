const mongoose = require('mongoose')

const { ObjectId } = mongoose

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,

    },
    picture: {
        type: String,
     },
     favCities: [{ 
         type: ObjectId,
         ref: 'City'
     }],
    favItineraries: [{ 
        type: ObjectId,
        ref: 'Itinerary'
    }]
})

module.exports = mongoose.model('Account', accountSchema)