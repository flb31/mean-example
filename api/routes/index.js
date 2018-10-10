'use strict'

var express = require('express')
var app = express()
var user = require('./user')
var artist = require('./artist')
var album = require('./album')
var song = require('./song')

app.use('/api', [user, artist, album, song])

module.exports = app
