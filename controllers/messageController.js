const db = require('../db/queries')

async function postNewMessage(req, res) {
    try {
        const userId = req.user.id
        const message = req.body.message
        await db.addNewMessage(userId, message)
        res.redirect('/')
    } catch (error) {
        console.error('Error posting message:', error)
        return res.status(500).json({ 
          error: 'Failed to post message'
        })
    }
}

function getNewMessage(req, res) {
    res.render('new-message')
}

module.exports = {postNewMessage, getNewMessage}