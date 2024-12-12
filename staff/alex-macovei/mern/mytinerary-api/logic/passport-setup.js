const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys')

passport.serialzier(function (user, done) {
    done(null, user.id)
})

passport.deserialzier(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})

module.exports = function () {
    passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
}