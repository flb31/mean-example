'use strict'

var express = require('express')
var ArtistController = require('../controllers/artist')
var app = express()
var router = express.Router()
var mdAuth = require('../middlewares/authenticated')
var multipart = require('connect-multiparty')
var mdMultipart = multipart({ uploadDir: './statics/uploads/artists' })

router.get('/:page', mdAuth.ensureAuth, ArtistController.index)
router.get('/:id', mdAuth.ensureAuth, ArtistController.show)
router.post('/', mdAuth.ensureAuth, ArtistController.save)
router.put('/:id', mdAuth.ensureAuth, ArtistController.update)
router.delete('/:id', mdAuth.ensureAuth, ArtistController.remove)
router.post('/upload/:id', [mdAuth.ensureAuth, mdMultipart], ArtistController.upload)
router.get('/image/:filename', ArtistController.showImage)

app.use('/artists', router)

module.exports = app
