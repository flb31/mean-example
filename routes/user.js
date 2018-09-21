'use strict'

var express = require('express')
var UserController = require('../controllers/user')
var app = express()
var router = express.Router()
var mdAuth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var mdMultipart = multipart({ uploadDir: './statics/uploads/users' })

router.get('/', UserController.index)
router.post('/', UserController.save)
router.post('/login', UserController.login)
router.put('/:id', mdAuth.ensureAuth, UserController.update)
router.post('/upload/:id', [mdAuth.ensureAuth, mdMultipart], UserController.upload)
router.post('/test', mdAuth.ensureAuth, UserController.test)
app.use('/users', router)

module.exports = app
