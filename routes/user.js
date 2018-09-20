'use strict'

var express = require('express')
var UserController = require('../controllers/user')
var app = express()
var router = express.Router()

router.get('/', UserController.index)
router.post('/', UserController.save)
router.post('/login', UserController.login)
app.use('/users', router)

module.exports = app
