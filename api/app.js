'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use( morgan('dev') )

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request')
    res.header('Access-Control-Allow-Method', 'GET, POST, PUT, OPTIONS, DELETE')
    res.header('Allow', 'GET, POST, PUT, OPTIONS, DELETE')

    next()
})

// routes
var routes = require('./routes')
app.use(routes)

// 404
app.use(function(req, res, next) {
    res.status(404).send('404 Error')
})

// Error
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Ups! Something has broken 😢')
});

module.exports = app
