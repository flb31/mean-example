'use strict'

var express = require('express')
var app = express()
var user = require('./user')
var artist = require('./artist')

app.use('/api', [user, artist])

module.exports = app
