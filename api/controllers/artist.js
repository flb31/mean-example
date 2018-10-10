'use strict'

var path = require('path')
var fs = require('fs')
require('mongoose-pagination')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')

function index(req, res) {
    var page = req.params.page
    var perPage = 3
    
    Artist.find().sort('name').paginate(page, perPage, (err, artists, total) => {
        if(err) {
            return res.status(500).send({
                message: 'Error pagination'
            })
        }

        return res.status(200).send({
            artists,
            total
        })

    })
}

function show(req, res) {
    var artistId = req.params.id

    Artist.findById(artistId, (err, artist) => {
        if(err) {
            return res.status(500).send({
                message: 'Error when found artist'
            })
        }

        if(!artist) {
            return  res.status(404).send({
                message: 'Artist not found'
            })
        }

        res.status(200).send({
            artist
        })
    })
}

function save(req, res) {

    var artist = new Artist()

    var params = req.body

    artist.name = params.name
    artist.description = params.description
    artist.image = null

    
    if(!artist.name) {
        return res.status(400).send({message: 'Name is required'})
    }

    if(!artist.description) {
        return res.status(400).send({message: 'Description is required'})
    }

    artist.save((err, artistStored) => {
        if(err) {
            return res.status(500).send({message: 'Error save artist'})
        }

        if(!artistStored) {
            return res.status(404).send({message: 'Artist not found'})
        }

        res.status(201).send({ artist: artistStored })
    })
    
}

function update(req, res) {
    var artistId = req.params.id

    var artist = req.body

    Artist.findByIdAndUpdate(artistId, artist, (err, artistUpdated) => {
        if(err || !artistUpdated) {
            return res.status(500).send({
                message: 'Error updating Artist'
            })
        }

        res.status(200).send({
            message: 'Artist updated',
            artist: artistUpdated
        })
    })
}

function remove(req, res) {

    var artistId = req.params.id

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err) {
            return res.status(500).send({
                message: 'Error remove Artist'
            })
        }

        if(!artistRemoved) {
            return res.status(404).send({
                message: 'Artist not found'
            })
        }

        // Remove albums
        Album.find({artist: artistRemoved._id}).remove( (err, albumRemoved) => {
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
                    message: 'Artist remove successfully'
                })
            })

        })

        
    })

}

function upload(req, res) {
    var artistId = req.params.id
    var filename = 'undefined-filename'

    if(!req.files || !req.files.image) {
        return res.status(404).send({
            message: 'File not found'
        })
    }

    var filePath = req.files.image.path
    filename = filePath.split('/')[3]

    Artist.findByIdAndUpdate(artistId, {image: filename}, (err, artistUpdated) => {
        if(err || !artistUpdated) {
            return res.status(500).send({
                message: 'Error upload image Artist'
            })
        }

        res.status(200).send({
            message: 'Artist image ',
            artist: artistUpdated
        })
    })
    
}

function showImage(req, res) {
    var filename = req.params.filename
    var pathImage = './statics/uploads/artists/' + filename

    fs.exists(pathImage, function(exists) {
        if(!exists) {
            return res.status(404).send({
                message: 'Image not found'
            })
        }

        res.sendFile(path.resolve(pathImage))
    })
}

module.exports =  {
    show,
    save,
    index,
    update,
    remove,
    upload,
    showImage
}
