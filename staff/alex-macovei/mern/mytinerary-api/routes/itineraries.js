const express = require('express')
const authorization = require('../logic/authorizations')
const toggleFavItinerary = require('../logic/toggle-favorite-itinerary')
const retrieveItinerariesByCity = require('../logic/retrieve-itineraries-by-city')

const router = express.Router()


router.get('/:cityId',
    (req, res) => {
        const cityId = req.params.cityId;

        retrieveItinerariesByCity(cityId)
            .then(itineraries => {
                res.send(itineraries)
            })
            .catch(err => console.log(err));
    });


router.post('/fav/:itineraryId', (req, res) => {
    var accountId = authorization(req.headers.authorization)

    toggleFavItinerary(accountId, req.params.itineraryId)
        .then(() => {
            res.sendStatus(201).json()
        })
        .catch(err => res.status(500).send(err.message))
})


module.exports = router