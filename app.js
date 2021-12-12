require('dotenv').config()
const express = require('express') //main framework
const mongoose = require('mongoose') //for database
const chalk = require('chalk')
const setRoutes = require('./routes/routes')
const setMiddlewares = require('./middlewares/middlewares')

const MONGODB_URI = 'mongodb://localhost:27017/blog-app' //url for db

//starting app
const app = express()

//setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// middlewares
setMiddlewares(app)

//setting all routes
setRoutes(app)

app.use((error, req, res, next) => {
    if(error.status == 404) {
        res.render('pages/errors/404.ejs')
    }
    else {
        console.log(chalk.red.inverse(error))
        res.render('pages/errors/500.ejs')
    }
})

const PORT = process.env.PORT
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Blog app started')
        })
    })
    .catch(e => {
        console.log(e)
    })
