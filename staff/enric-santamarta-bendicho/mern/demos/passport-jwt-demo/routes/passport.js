const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const { retrieveUser } = require('../logic')

const { env: { JWT_SECRET } } = process

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
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
                return res.json({ error: 'invalid token' })

            req.user = user

            next()
        })(req, res, next)
    }
}