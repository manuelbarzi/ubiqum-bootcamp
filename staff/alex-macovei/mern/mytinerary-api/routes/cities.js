const express = require('express')
const postComment = require('../logic/post-comment')
const retrieveComments = require('../logic/retrieve-comments')

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

router.post('/comments/:cityId',
    (req, res) => {
        postComment(req.params.cityId, req.headers.name, req.headers.comment)
            .then(() => res.status(201).send())
            .catch(err => res.status(500).send(err.message))
    }
)

router.get('/comments/:cityId',
    (req, res) => {
        retrieveComments(req.params.cityId)
            .then(comments => res.status(200).send(comments))
            .catch(err => res.status(500).send(err.message))
    }
)

module.exports = router