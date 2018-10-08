'use strict'

var express = require('express')
var app = express()
var user = require('./user')
var artist = require('./artist')
var album = require('./album')

app.use('/api', [user, artist, album])

module.exports = app
