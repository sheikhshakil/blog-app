const router = require('express').Router()
const signupValidator = require('../validators/auth/signupValidator')
const loginValidator = require('../validators/auth/loginValidator')
const isUnauthenticated = require('../middlewares/isUnauthenticated')
const isAuthenticated = require('../middlewares/isAuthenticated')

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

router.get('/signup', isUnauthenticated(), signupGetController)
router.post('/signup',signupValidator, signupPostController)

router.get('/login', isUnauthenticated(), loginGetController)
router.post('/login', loginValidator, loginPostController)

router.get('/logout',isAuthenticated() , logoutController)

module.exports = router