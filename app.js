'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use( morgan('dev') )

// routes
var routes = require('./routes')
app.use(routes)

module.exports = app
