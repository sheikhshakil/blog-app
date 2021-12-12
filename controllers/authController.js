//const bcrypt = require('bcrypt')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const formatter = require('../utils/validationFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create an account' })
}

//signup controller
exports.signupPostController = async (req, res, next) => {
    let { name, username, email, password } = req.body
    //gathering the validation errors
    let errors = validationResult(req).formatWith(formatter)

    if (!errors.isEmpty()) {
        errors = errors.mapped()
        return res.render('pages/auth/signup.ejs', {
            title: 'Create an Account', errors, values: {
                name,
                username,
                email,
                password
            }
        })
    }
    else {
        try {
            //encrypting the password
            //let hashedPass = await bcrypt.hash(password, 13)
            //creating a document from model
            //schema onujayi same argument dite hobe
            let user = new User({
                name,
                username,
                email,
                password
            })
            let newUser = await user.save()
            console.log('User created Successfully', newUser)
            res.render('pages/auth/login.ejs', { title: 'Signup Successful' })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

exports.loginGetController = (req, res, next) => {
    //console.log(req.user)
    res.render('pages/auth/login.ejs', { title: 'Login to Your Account' })
}

//blank input is handles by login validator
//existence of username and password is verified here to make system secure
exports.loginPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(formatter)
    if (!errors.isEmpty()) {
        res.render('pages/auth/login.ejs', { title: 'Login', errors: errors.mapped() })
    }
    else {
        let { username, password } = req.body

        try {
            let user = await User.findOne({ username })

            if (user) {
                let match = user.password == password ? true : false
                if (match) {
                    //res.setHeader('Set-Cookie', 'isAuthenticated=true') //setting cookie
                    //session module dara cookie create hobe ekhon
                    req.session.isLoggedIn = true
                    req.session.user = user
                    req.session.save(err => {
                        if(err) {
                            console.log(err)
                            return next(err)
                        }
                        else {
                            res.redirect('/dashboard')
                        }
                    })
                }
                else {
                    let errors = { username: 'Wrong Credentials', password: 'Wrong Credentials' }
                    res.render('pages/auth/login.ejs', { title: 'Login to Your Account', errors })
                }
            }

            else {
                let errors = { username: 'Wrong Credentials', password: 'Wrong Credentials' }
                res.render('pages/auth/login.ejs', { title: 'Login to Your Account', errors })
            }

        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
            return next(err)
        }
        else{ 
            res.redirect('/auth/login')
        }
    })
}