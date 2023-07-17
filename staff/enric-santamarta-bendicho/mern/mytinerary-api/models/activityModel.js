const mongoose = require('mongoose')


const activitySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    itinerary:{
        type:String,
        required:true
    },
    itineraryID:{
        type:String,
        required: true
    }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('activity', activitySchema)