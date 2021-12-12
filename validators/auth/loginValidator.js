const User = require('../../models/User')
const { body } = require('express-validator')

const loginValidator = [
    body('username').not().isEmpty().withMessage('Please provide your Username!'),
    body('password').not().isEmpty().withMessage('Password can\'t be empty!')
]

module.exports = loginValidator