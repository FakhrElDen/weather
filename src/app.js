const express = require('express')

// it use process.env.port value to run project on heroku
// if value equal null will use 3000 to run project on localhost
const port = process.env.PORT || 3000

//handlebars it's npm package to use it as the default view engine & using partials
const hbs = require('hbs')

//core node module
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//it's a configuration for express to use its function and method
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Fakhr El-Din'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed Fakhr El-Din'
    })
})

app.get('/weather', (req, res) => {
    //this validation to make sure there is an address sent it in request
    //by access request.query.address of route weather
    //req.query that helps you to handle requests in express
    if (!req.query.address) {

        // send is a method used with responce to send something back to requester
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // get address from request 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohamed Fakhr El-Din',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})