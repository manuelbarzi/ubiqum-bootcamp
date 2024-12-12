const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const key = require("../keys")
//const passport = require('../passport')
const authorization = require('../logic/authorizations')
const retrieveAccounts = require('../logic/retrieve-accounts')
const retrieveAccount = require('../logic/retrieve-account')
const createAccount = require('../logic/create-account')
const authenticateAccount = require('../logic/authenticate-account')
//const accountModel = require('../model/account-model')

//Check accounts
router.get('/all',
    (req, res) => {
        retrieveAccounts()
            .then(files => {
                res.send(files)
            })
            .catch(err => res.status(500).send(err.message));
    });

//Register account
router.post('/',
    (req, res) => {
        const { body: { email, password, picture } } = req

        try {
            createAccount(
                email,
                password,
                picture,
            )
                .then(() => res.status(201).send())
                .catch(err => res.status(500).send(err.message))
        } catch (error) {
            res.status(500).send(error.message)
        }
    })

//authenticate Account
router.post('/auth',
    (req, res) => {
        const { body: { email, password } } = req

        try {
            authenticateAccount(
                email,
                password,
            )
                .then(id => {
                    const payload = { sub: id };
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

router.get('/',
    (req, res) => {
        const token = authorization(req.headers.authorization)
        return retrieveAccount(token)
            .select('favItineraries _id email password picture')
            .populate('favItineraries')
            .exec()
            .then(account => {
                if (account) {
                    res.json(account)
                } else {
                    res.status(400).json({ error: 'account not found' })
                }
            })
            .catch(err => res.status(500).send(err.message))
    }
)

/*router.get("/test",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        accountModel.findOne({ _id: req.id })
            .then(account => {
                res.json(account);
            })
            .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
);
*/
module.exports = router