const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const key = require('../keys')
const jwt = require("jsonwebtoken")
const passport = require('passport')
const { authorize } = require('./passport')

const router = express.Router()

const retrieveAllUsers = require('../logic/retrieve-all-users')
const registerUser = require('../logic/register-user')
const authenticateUser = require('../logic/authenticate-user');
const retrieveUser = require('./handler/retrieve-user')




router.use(passport.initialize())


router.get('/test', (req, res) => {
    res.send({ msg: 'Here is the users test route.' })

})


/*get all users*/
router.get('/all',
    (req, res) => {
        retrieveAllUsers()
            .then(users => {
                res.send(users)
            })
            .catch(err => console.log(err))
    })


/*post users*/
router.post('/', body('email').isEmail().withMessage('please, introduce a valid e-mail adresse'), body('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'), (req, res) => {
    const { body: { name, email, password, foto, favorites } } = req
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.

        registerUser(name, email, hash, foto, favorites)
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    });

})

/*authenticate login*/
router.post('/auth', body('email').isEmail().withMessage('please, introduce a valid e-mail adresse'), body('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
    (req, res) => {
        const { body: { password, email } } = req
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            authenticateUser(
                email,
                password,
            )
                .then(id => {
                    const payload = {
                        sub: id
                    };
                    const options = { expiresIn: 2592000 };

                    jwt.sign(
                        payload,
                        key.secretOrKey,
                        options,
                        (err, token) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    token: "There was an error"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    token: token
                                });
                            }
                        }
                    );
                })
                .catch(err => res.status(500).send(err.message))
        } catch (error) {
            res.status(500).send(error.message)
        }
    })

/*retrieve current User*/
router.get('/', authorize, retrieveUser)

module.exports = router