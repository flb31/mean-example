'use strict'

var express = require('express')
var SongController = require('../controllers/song')
var app = express()
var router = express.Router()
var mdAuth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var mdMultipart = multipart({ uploadDir: './statics/uploads/songs' })

router.get('/:id', mdAuth.ensureAuth, SongController.show)
router.post('/', mdAuth.ensureAuth, SongController.save)
router.get('/:album?/page/:page', mdAuth.ensureAuth, SongController.index)
router.put('/:id', mdAuth.ensureAuth, SongController.update)
router.delete('/:id', mdAuth.ensureAuth, SongController.remove)
router.post('/upload/:id', [mdAuth.ensureAuth, mdMultipart], SongController.upload)
router.get('/song/:filename', SongController.showFile)

app.use('/songs', router)

module.exports = app
