'use strict'

var express = require('express')
var bodyParser = require('body-parser');

var app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes
app.get('/', function(req, res){
    res.send({
        message: 'Hello'
    });
})

module.exports = app
