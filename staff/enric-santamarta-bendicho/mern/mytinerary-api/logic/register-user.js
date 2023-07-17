const userModel = require('../models/userModel')

module.exports = (name, email, password, foto, favorites) => {
    const newUser = new userModel({
        name, 
        email, 
        password, 
        foto,
        favorites
    })
    return userModel.findOne({ name, email }) 
        .then(user => {
            if (user)
                throw new Error("The user " + name + " already exists in the database")

            return newUser.save()
        })    
}