const User = require('../models/User')

module.exports = () => {
    return async (req, res, next) => {
        if(req.session.isLoggedIn) {
            try {
                let user = await User.findById(req.session.user._id)
                if(user) {
                    req.user = user
                    return next()
                }
                else {
                    return next()
                }
            } catch (error) {
                console.log(error)
                next(error)
            }
        }
        else {
            return next()
        }
    }
}