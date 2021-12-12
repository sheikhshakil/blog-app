const router = require('express').Router()

const authRoute = require('../routes/authRoute')
const dashboardRoute = require('../routes/dashboardRoute')

let allRoutes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/',
        handler: (req, res, next) => {
            res.render('pages/home.ejs', {title: 'Home'})
        }
    },
    {
        path: '*',
        handler: (req, res, next) => {
            let error = new Error('Page not found')
            error.status = 404
            next(error)
        }
    }
]


module.exports = (app) => {
    allRoutes.forEach(route => {
        if(route.path == '/') {
            app.get(route.path, route.handler)
        }
        else {
            app.use(route.path, route.handler)
        }
    })
}