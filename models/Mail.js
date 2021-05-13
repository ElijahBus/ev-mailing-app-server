const {Schema, model} = require('mongoose')

const MailSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Mail = model('mail', MailSchema)

module.exports = Mail