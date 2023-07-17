require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const { users } = require('./routes')

const { env: { MONGODB_URL, PORT = 8080 } } = process

    ;
(async () => {
    try {
        await mongoose.connect(MONGODB_URL, {})

        const app = express()

        app.get('/hello', (req, res) => res.send('Hello, World!'))

        app.use('/api/users', users)

        app.listen(PORT, () => console.log(`server started and listening on port ${PORT}`))
    } catch (error) {
        console.error(error.message)
    }
})()