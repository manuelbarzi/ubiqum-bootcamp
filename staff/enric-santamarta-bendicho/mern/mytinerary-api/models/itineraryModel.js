const mongoose = require('mongoose')
const Schema = mongoose.Schema


//usar CityID en vez de nombre
const itinerarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    hashtags: {
        type: [String],
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cityID: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    comments:[{
        type: Schema.Types.ObjectId, 
        ref: 'comment'
     }]
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerary', itinerarySchema)