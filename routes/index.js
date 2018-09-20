'use strict'

var express = require('express')
var app = express()
var user = require('./user')

app.use('/api/v1', user)

module.exports = app
