const router = require('express').Router()
const { 
    dashboardGetController,
    createProfileGetController,
    editProfileGetController,
    createProfilePostController
} = require('../controllers/dashboardController')

const uploadFile = require('../middlewares/uploadMiddleware')

const isAuthenticated = require('../middlewares/isAuthenticated') //for checking authentication


router.get('/', isAuthenticated(), dashboardGetController)

router.get('/create-profile', isAuthenticated(), createProfileGetController)

router.post('/create-profile', uploadFile.single('profilePic'), isAuthenticated(), createProfilePostController)

router.get('/edit-profile', isAuthenticated(), editProfileGetController)

module.exports = router