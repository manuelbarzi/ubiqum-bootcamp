const cityModel = require('../models/cityModel')

module.exports = (name, country, image) => {
    const newCity = new cityModel({
        name,
        country,
        image
    })
    return cityModel.findOne({ name, country })
        .then(city => {
            if (city)
                throw new Error("The city " + name + " from " + country + " already exists in the database")

            return newCity.save()
        })
}