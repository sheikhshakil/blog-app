const express = require('express') //main framework
const morgan = require('morgan') //app activity -mw
const bodyParser = require('body-parser') //getting form input from req.body -mw
const session = require('express-session') //creating sessions -mw
const MongoDBStore = require('connect-mongodb-session')(session) //for storing sessions


//for easiness
const bindUserWithRequest = require('./bindUserWithRequest')
const setLocals = require('./setLocals')

const MONGODB_URI = 'mongodb://localhost:27017/blog-app' //url for db

//creating a store to make operations on sessions
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000*60*60*5
})

//middleware array
const middlewares = [
    morgan('dev'),
    express.static('public'),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),

    //for creating session
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    bindUserWithRequest(), // extracting user from session and attaching with req to always get it
    setLocals()
]

module.exports = (app) => {
    middlewares.forEach(middleware => {
        app.use(middleware)
    })
}