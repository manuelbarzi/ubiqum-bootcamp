const passport = require("passport")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const mongoose = require("mongoose");
const User = require('../models/userModel');
const key = require('../keys');
const retrieveUser = require('../logic/retrieve-user')

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: key.secretOrKey
    },
    async (payload, done) => {
        try {
            const user = await retrieveUser(payload.sub)

            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))

module.exports = {
    authorize(req, res, next) {
        passport.authorize('jwt', (error, user) => {
            if (error)
                return res.json({ error: error.message })

            if (!user) // user value is false (boolean) when the token is invalid
                return res.status(401).json({ error: 'invalid token' })

            req.user = user

            next()
        })(req, res, next)
    }
}