const db = require('../db/queries')
const { body, validationResult } = require('express-validator');

const validateMessage = [
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 1000 }).withMessage('message can only be up to 1000 characters')
        .escape()
];

async function postNewMessage(req, res) {
    try {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res.render('new-message', {
                errors: validationErrors.array(),
                message: req.body.message
              })
        }

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

async function postDeleteMessage(req, res) {
    try {
        const messageId = req.params.id
        await db.deleteMessage(messageId)
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

module.exports = {postNewMessage, getNewMessage, validateMessage, postDeleteMessage}