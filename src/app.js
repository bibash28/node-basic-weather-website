const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

  
const app = express()
const port = 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather", 
        name: "Bibash Shrestha", 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About", 
        name: "Bibash Shrestha", 
        img: "/img/me.jpg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",  
        name: "Bibash Shrestha", 
        helpText : "Help me"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide a address term"
        })  
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {
        if(error)
        return res.send({
            error : "Something went wrong while fetching coordinate. Try another serach"
        })   
        weather(latitude, longitude, (error, data) => {
            if(error)
            return res.send({
                error : "Something went wrong while fetching data"
            })
            res.send({
                forecast: data,
                location,
                address : req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })  
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get("/help/*", (req, res) => { 
    res.render('404', {
        title: "404", 
        name: "Bibash Shrestha", 
        errorMessage: 'Article Not Found.'
    })
})

app.get("*", (req, res) => { 
    res.render('404', {
        title: "404", 
        name: "Bibash Shrestha", 
        errorMessage: 'Page not found.'
    })
  })







app.listen(port, () => console.log("listening on port "+ port))