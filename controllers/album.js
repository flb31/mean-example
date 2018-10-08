'use strict'

var path = require('path')
var fs = require('fs')
require('mongoose-pagination')

var Album = require('../models/album')
var Song = require('../models/song')

function index(req, res) {
    
    var artistId = req.params.artist
    var page = req.params.page
    var perPage = 3
    
    var findby = (artistId) ? { artist: artistId }  : {}
    
    
    Album.find(findby).sort('title').populate({path: 'artist'}).exec( (err, albums) => {
        if(err) {
            return res.status(500).send({
                message: 'Error pagination',
                err
            })
        }

        return res.status(200).send({
            albums
        })
    })

}

function show(req, res) {
    var albumId = req.params.id

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => { 
        if(err) {
            return res.status(500).send({
                message: 'Error when found album'
            })
        }

        if(!album) {
            return  res.status(404).send({
                message: 'Album not found'
            })
        }

        res.status(200).send({
            album
        })
    })
}

function save(req, res) {

    var album = new Album()

    var params = req.body

    album.title = params.title
    album.description = params.description
    album.year = params.year
    album.image = null
    album.artist = params.artist

    
    if(!album.title) {
        return res.status(400).send({message: 'Title is required'})
    }

    if(!album.description) {
        return res.status(400).send({message: 'Description is required'})
    }

    if(!album.year) {
        return res.status(400).send({message: 'Year is required'})
    }

    if(!album.artist) {
        return res.status(400).send({message: 'Artist is required'})
    }

    album.save((err, albumStored) => {
        if(err) {
            return res.status(500).send({message: 'Error save album'})
        }

        if(!albumStored) {
            return res.status(404).send({message: 'Album not found'})
        }

        res.status(201).send({ album: albumStored })
    })
    
}

function update(req, res) {
    var albumId = req.params.id

    var album = req.body

    Album.findByIdAndUpdate(albumId, album, (err, albumUpdated) => {
        if(err || !albumUpdated) {
            return res.status(500).send({
                message: 'Error updating Album'
            })
        }

        res.status(200).send({
            message: 'Album updated',
            album: albumUpdated
        })
    })
}

function remove(req, res) {
    var albumId = req.params.id

    // Remove albums
    Album.findById(albumId).remove( (err, albumRemoved) => {
        if(err) {
            return res.status(500).send({
                message: 'Error remove Album'
            })
        }

        if(!albumRemoved) {
            return res.status(404).send({
                message: 'Album not found'
            })
        }


        // Remove songs
        Song.find({artist: albumRemoved._id}).remove( (err, songRemoved) => {
            if(err) {
                return res.status(500).send({
                    message: 'Error remove Song'
                })
            }
    
            if(!songRemoved) {
                return res.status(404).send({
                    message: 'Song not found'
                })
            }

            // Success everything
            return res.status(200).send({
                message: 'Album remove successfully'
            })
        })

    })
}

function upload(req, res) {
    var albumId = req.params.id
    var filename = 'undefined-filename'

    if(!req.files || !req.files.image) {
        return res.status(404).send({
            message: 'File not found'
        })
    }

    var filePath = req.files.image.path
    filename = filePath.split('/')[3]

    Album.findByIdAndUpdate(albumId, {image: filename}, (err, albumUpdated) => {
        if(err || !albumUpdated) {
            return res.status(500).send({
                message: 'Error upload image Album'
            })
        }

        res.status(200).send({
            message: 'Album image ',
            artist: albumUpdated
        })
    })
    
}

function showImage(req, res) {
    var filename = req.params.filename
    var pathImage = './statics/uploads/albums/' + filename

    fs.exists(pathImage, function(exists) {
        if(!exists) {
            return res.status(404).send({
                message: 'Image not found'
            })
        }

        res.sendFile(path.resolve(pathImage))
    })
}

module.exports = {
    show,
    save,
    index,
    update,
    remove,
    upload,
    showImage
}
