const express = require('express')

const router = express.Router()

const retrieveAllItineraries = require('../logic/retrieve-all-itineraries')
const retrieveItinerariesById = require('../logic/retrieve-itinerary-by-cityID')
const toggleFavoriteItinerary = require('../logic/toggle-favorite-itinerary')
const { authorize } = require('./passport')
const userModel = require('../models/userModel')

router.get('/test', (req, res) => {
    res.send({ msg: 'Here is the itineraries test route.' })

});


/*get all itineraries*/
router.get('/all',
    (req, res) => {
        retrieveAllItineraries()
            .then(itineraries => {
                res.send(itineraries)
            })
            .catch(err => console.log(err))
    });

/*get a specific itineraries after its city name name*/
router.get('/:cityID',
    (req, res) => {
        retrieveItinerariesById(req.params.cityID)
            .then(itinerary => {
                res.send(itinerary)
            })
            .catch(err => console.log(err));
    });

/*retrieve favorites by user */
router.get('/user/favorites', authorize, async (req, res) => {

    const { user: { id: userId } } = req

    userModel.findOne({ _id: userId }).populate('favorites')
        .then((user) => {
            res.send(user.favorites) // TODO rtfm monoose populate
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
});

/*add itineraries to favorites*/
router.post('/toggle-favorite/:itineraryId', authorize, async (req, res) => {

    const { params: { itineraryId }, user: { id: userId } } = req

    toggleFavoriteItinerary(userId, itineraryId)

        .then(user => {
            res.send(user)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
});



module.exports = router