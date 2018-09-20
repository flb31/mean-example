'use strict'

var express = require('express')
var bodyParser = require('body-parser');

var app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes
var userRoutes = require('./routes/user');
app.use('/api', userRoutes)

module.exports = app
