const db = require('../db/queries')
const { body, validationResult } = require('express-validator');

const validateMessage = [
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 1000 }).withMessage('message can only be up to 1000 characters')
        .escape()
];

async function postNewMessage(req, res, next) {
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
        next(error)
    }
}

async function postDeleteMessage(req, res) {
    try {
        const messageId = req.params.id
        await db.deleteMessage(messageId)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

function getNewMessage(req, res) {
    res.render('new-message')
}

module.exports = {postNewMessage, getNewMessage, validateMessage, postDeleteMessage}