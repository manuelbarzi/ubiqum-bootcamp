const { registerUser } = require('../../logic')

module.exports = async (req, res) => {
    try {
        const { body: { name, email, password } } = req

        await registerUser(name, email, password)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}