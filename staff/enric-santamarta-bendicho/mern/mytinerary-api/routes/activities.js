const express = require('express')

const router = express.Router()

const retrieveAllActivities = require('../logic/retrieve-all-activities')
const retrieveAcitivtyByItinerary = require('../logic/retrieve-activity-by-itineraryID')


router.get('/test', (req, res) => {
    res.send({ msg: 'Here is the activities test route.' })

})

/*get all activites*/
router.get('/all',
    (req, res) => {
        retrieveAllActivities()
            .then(activities => {
                res.send(activities)
            })
            .catch(err => console.log(err))
    })

/*get a specific activity after its itinerary*/
router.get('/:itineraryID',
    (req, res) => {
        retrieveAcitivtyByItinerary(req.params.itineraryID)
            .then(activity => {
                res.send(activity)
            })
            .catch(err => console.log(err));
    });


module.exports = router
