const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    foto:{
        type:String
    },
    favorites:[{
       type: Schema.Types.ObjectId, 
       ref: 'itinerary'
    }]
})

//name of module is the singular version (user) of the database name (users)
module.exports = mongoose.model('user', userSchema)