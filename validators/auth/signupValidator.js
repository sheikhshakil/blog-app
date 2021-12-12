const User = require('../../models/User')
const { body } = require('express-validator')

//signup validator
const signupValidator = [
    body('name').not().isEmpty().withMessage('Please provide your name!')
        .trim(),

    body('username').isLength({ min: 3, max: 15 }).withMessage('Username must be between 3-15 chars!')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (user) {
                return Promise.reject('Username already exists, Please choose another one!')
            }
            return true
        })
        .trim(),

    body('email').isEmail().withMessage('Please provide a valid email!')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (user) {
                return Promise.reject('User with this Email already exists') //promise return korle reject korte hbe
            }
            return true
        })
        .normalizeEmail(),

    body('password').isLength({ min: 5, max: 15 }).withMessage('Please provide a password within 5-15 chars!'),

    body('confirmPassword').custom((pass, { req }) => {
        if (pass != req.body.password) {
            throw new Error('Passwords don\'t match!')
        }
        return true //eta must dite hobe
    })
]

module.exports = signupValidator