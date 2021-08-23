const express = require('express')
const router = express.Router()
const passport = require("passport");

router.get('/', 
  passport.authenticate('google', { scope: ['email'] }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    const payload = {
      id: req.user.id,
      name: req.user.name,
    };
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926
      },
      (err, token) => {
        console.log(token);
        res.redirect(`http://localhost:3000/google/?token=Bearer${token}`);
      })
  });
module.exports = router