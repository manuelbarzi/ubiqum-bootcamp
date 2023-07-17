const express = require('express')

const router = express.Router()

const { authorize } = require('./passport')
const createComment = require('../logic/create-comment')
const retrieveAllComments = require('../logic/retrieve-all-comments')
const retrieveCommentsByItinerary = require('../logic/retrieve-comments-by-itinerary')

/*comments test route*/
router.get('/test', (req, res) => {
    res.send({ msg: 'Here is the comments test route.' })

});

/*post comments*/
router.post('/:itineraryId/:comment', authorize, async (req, res) => {

    const { params: { itineraryId, comment }, user: { id: userId } } = req

    createComment(comment, userId, itineraryId)

        .then(comment => {
            res.send(comment)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })

})

/*get a specific comments after its itinerary*/
router.get('/itinerary/:itineraryId', async (req, res) => {

    const { params: { itineraryId } } = req

    retrieveCommentsByItinerary(req.params.itineraryId)

        .then(comments => {
            res.send(comments)
        })
        .catch(err => console.log(err));
});

/*get all the comments*/
router.get('/all',
    (req, res) => {
        retrieveAllComments()
            .then(comments => {
                res.send(comments)
            })
            .catch(err => console.log(err))
    })


module.exports = router