const Profile = require('../models/Profile')

exports.dashboardGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })

        if (profile) {
            res.render('pages/dashboard/dashboard.ejs', { title: 'Dashboard of ' + req.user.name })
        }
        else {
            res.redirect('/dashboard/create-profile')
        }

    } catch (error) {
        next(error)
    }
}

exports.createProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })

        if (!profile) {
            res.render('pages/dashboard/createProfile.ejs', { title: 'Create Your Profile'})
        }
        else {
            res.redirect('/dashboard/edit-profile')
        }

    } catch (error) {
        next(error)
    }
}

exports.createProfilePostController = async (req, res, next) => {
    try {
        console.log(req.file)
        console.log(req.body)

        let profile = new Profile({
            user: req.user,
            bio: req.body.bio,
            country: req.body.country,
            profilePic: 'public/uploads/' + req.file.filename,
            links: {
                facebook: req.body.linkfb,
                github: req.body.linkgithub,
                twitter: req.body.linktwitter
            }
        })
        let createdProfile = await profile.save()
        console.log('successful')
        res.redirect('/dashboard')
    } catch (error) {
        next(error)
    }
}

exports.editProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })

        if (profile) {
            res.render('pages/dashboard/editProfile.ejs', { title: 'Edit Your Profile'})
        }
        else {
            res.redirect('/dashboard/create-profile')
        }

    } catch (error) {
        next(error)
    }
}