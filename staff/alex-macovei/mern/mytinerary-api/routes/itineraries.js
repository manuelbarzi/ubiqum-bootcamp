const express = require('express')

const router = express.Router()

const retrieveItineraries = require('../logic/retrieve-itineraries')

router.get('/:name',
    (req, res) => {
        const city = req.params.name;
        retrieveItineraries(city)
            .then(itinerary => {
                res.send(itinerary)
            })
            .catch(err => console.log(err));
    });

module.exports = router