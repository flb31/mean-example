'use strict'

var express = require('express')
var AlbumController = require('../controllers/album')
var app = express()
var router = express.Router()
var mdAuth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var mdMultipart = multipart({ uploadDir: './statics/uploads/albums' })

router.get('/:id', mdAuth.ensureAuth, AlbumController.show)
router.post('/', mdAuth.ensureAuth, AlbumController.save)
router.get('/:artist?/page/:page', mdAuth.ensureAuth, AlbumController.index)
router.put('/:id', mdAuth.ensureAuth, AlbumController.update)
router.delete('/:id', mdAuth.ensureAuth, AlbumController.remove)
router.post('/upload/:id', [mdAuth.ensureAuth, mdMultipart], AlbumController.upload)
router.get('/image/:filename', AlbumController.showImage)

app.use('/albums', router)

module.exports = app
