const accountModel = require('../model/account-model')
const itineraryModel = require('../model/itinerary-model')

module.exports = async function (userId, itineraryId) {
    const account = await accountModel.findOne({_id: userId})

    if (!account) { throw new Error('Account does not exist') }

    const itinerary = await itineraryModel.findOne({_id: itineraryId})
    
    if (!itinerary) { throw new Error('Itinerary does not exist') }

    return (async () => {
        const index = await account.favItineraries.findIndex(favItineraries => favItineraries.toString() === itineraryId.toString())

        if (index < 0)
            account.favItineraries.push(itineraryId)
        else
            account.favItineraries.splice(index, 1)

        await account.save()
    })() // IIFE
}