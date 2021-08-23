const express = require('express')

const router = express.Router()

const retrieveAllCities = require('../logic/retrieve-all-cities')

router.get('/all',
    (req, res) => {
        retrieveAllCities()
            .then(files => {
                res.send(files)
            })
            .catch(err => res.status(500).send(err.message));
    });

module.exports = router