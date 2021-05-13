require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request')
const bodyParser = require('body-parser')

const mailRoutes = require('./routes/api/mail')

const app = express()

app.use(cors())
app.use(morgan(`tiny`))
app.use(bodyParser.json())

const {PORT, mongoUri} = require('./config.js')

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('MONGO DB CONNECTED'))
    .catch(err => console.log(err))

app.use('/api/mail', mailRoutes)

app.get('/api/mail', mailRoutes)
app.get('/', ((req, res) => console.log('Hello world')))

app.listen(PORT, () => console.log(`App listening to the port ${PORT}`))