const express = require('express')
const { registerUser, authenticateUser, retrieveUser } = require('./handlers')
const passport = require('passport')
const { authorize } = require('./passport')

const router = new express.Router()
const jsonBodyParser = express.json()

router.use(passport.initialize())

router.post('/', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/', authorize, retrieveUser)

module.exports = router