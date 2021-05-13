const {Router} = require('express')
const Mail = require('../../models/Mail')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const mails = await Mail.find()
        if (!mails) throw new Error('No mails')

        // const sortedMails = mails.sort((a, b) => {
        //     return new Date(a.data).getTime() - new Date(b.date).getTime()
        // })

        res.status(200).json(mails)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post('/', async (req, res) => {
    const newMail = new Mail(req.body)

    try {
        const mail = await newMail.save()

        if (!mail) throw new Error('Something went wrong, mail did not get sent')

        res.status(200).json(mail)
    } catch (err) {
        res.status(500).json(err.message)
    }

})

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const response = await Mail.findByIdAndUpdate(id, req.body)

        if (!response) throw new Error('Something went wrong')

        const updated = {...response._doc, ...req.body}

        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const removed = await Mail.findByIdAndDelete(id)

        if(!removed) throw new Error('Something went wrong')

        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router