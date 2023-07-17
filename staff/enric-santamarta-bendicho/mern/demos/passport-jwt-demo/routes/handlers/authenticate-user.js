const { authenticateUser } = require('../../logic')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = async (req, res) => {
    try {
        const { body: { email, password } } = req

        const id = await authenticateUser(email, password)

        const token = jwt.sign({ sub: id }, JWT_SECRET)

        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}