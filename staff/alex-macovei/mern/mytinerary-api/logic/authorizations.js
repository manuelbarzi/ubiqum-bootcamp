const key = require("../keys")
const jwt = require("jsonwebtoken")

module.exports = function (authorization) {
    const token = authorization.split(' ')[1]
    return jwt.verify(token, key.secretOrKey, (err, payload) => {
        if (err) throw new Error(err.message)
        return payload.sub
    })
}