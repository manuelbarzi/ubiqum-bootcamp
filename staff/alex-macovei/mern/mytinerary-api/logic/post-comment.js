const commentModel = require('../model/comment-model')
const cityModel = require('../model/city-model')

module.exports = async function (cityId, name, comment) {

    city = await cityModel.findOne({ _id: cityId })
    if (!city) { throw new Error('City does not exist') }

    return (async () => {

        const newComment = new commentModel({
            name,
            comment,
            cityId,
        })

        await newComment.save()
    })()
}