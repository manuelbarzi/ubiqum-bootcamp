const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Account = require("./model/account-model");
const key = require("./keys");
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Account.findById(jwt_payload.sub)
        .then(account => {
          if (account) {
            return done(null, account);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
