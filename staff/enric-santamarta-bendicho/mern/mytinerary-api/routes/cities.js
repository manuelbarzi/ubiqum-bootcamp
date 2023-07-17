const express = require('express')

const router = express.Router()
const retrieveAllCities = require('../logic/retrieve-all-cities')
const retrieveCitiesByName = require('../logic/retrieve-city-by-name')
const createCity = require('../logic/create-city')



router.get('/test', (req, res) => {
    res.send({ msg: 'Here is the cities test route.' })

})

/*get all the cities*/
router.get('/all',
    (req, res) => {
        retrieveAllCities()
            .then(cities => {
                res.send(cities)
            })
            .catch(err => console.log(err))
    })

/*get a specific city after its name*/
router.get('/:name',
    (req, res) => {
        retrieveCitiesByName(req.params.name)
            .then(city => {
                res.send(city)
            })
            .catch(err => console.log(err));
    });

/*post cities*/
router.post('/', (req, res) => {
    const { body: { name, country, image } } = req

    createCity(name, country, image)
        .then(city => {
            res.send(city)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })

})

module.exports = router