'use strict'

var path = require('path')
var fs = require('fs')
require('mongoose-pagination')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')
var StringHelper = require('../helpers/strings')

function index(req, res) {
    
    var albumId = req.params.album
    var page = req.params.page
    var perPage = 3
    
    var findby = {}
    var populate = {}

    if(!albumId) {
        populate = {
            path: 'album',
            populate: {
                path: 'artist'
            }
        }

        findby = { album: albumId }
    } else {
        populate = { path: 'album'}
    }
    
    
    Song.find(findby).sort('number').populate(populate).exec( (err, songs) => {

        if(err) {
            return res.status(500).send({
                message: 'Error when search songs',
                err
            })
        }

        return res.status(200).send({
            songs
        })
    })

}

function show(req, res) {
    var songId = req.params.id

    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err) {
            return res.status(500).send({
                message: 'Error when found song'
            })
        }

        if(!song) {
            return  res.status(404).send({
                message: 'Song not found'
            })
        }

        res.status(200).send({
            song
        })
    })
}

function save(req, res) {

    var song = new Song()

    var params = req.body

    song.number = params.number
    song.title = params.title
    song.duration = params.duration
    song.file = null
    song.album = params.album

    
    if(!song.number) {
        return res.status(400).send({message: 'Number is required'})
    }

    if(!song.title) {
        return res.status(400).send({message: 'Title is required'})
    }

    if(!song.duration) {
        return res.status(400).send({message: 'Duration is required'})
    }

    if(!song.album) {
        return res.status(400).send({message: 'Album is required'})
    }


    song.save((err, songStored) => {
        if(err) {
            return res.status(500).send({message: 'Error save song'})
        }

        if(!songStored) {
            return res.status(404).send({message: 'Song not found'})
        }

        res.status(201).send({ song: songStored })
    })
    
}


function update(req, res) {
    var songId = req.params.id

    var song = req.body

    Song.findByIdAndUpdate(songId, song, (err, songUpdated) => {
        if(err || !songUpdated) {
            return res.status(500).send({
                message: 'Error updating Song'
            })
        }

        res.status(200).send({
            message: 'Song updated',
            song: songUpdated
        })
    })
}

function remove(req, res) {
    var songId = req.params.id

    Song.findById(songId).remove( (err, songRemoved) => {
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
            message: 'Song remove successfully'
        })
    })
}

function upload(req, res) {
    var songId = req.params.id
    var filename = 'undefined-filename'

    if(!req.files || !req.files.file) {
        return res.status(404).send({
            message: 'File not found'
        })
    }

    var filePath = req.files.file.path
    filename = filePath.split('/')[3]

    var extFile = filename.split('.')[1];

    if(StringHelper.isAudioFile(extFile)) {
        Song.findByIdAndUpdate(songId, {file: filename}, (err, songUpdated) => {
            if(err || !songUpdated) {
                return res.status(500).send({
                    message: 'Error upload file Song'
                })
            }
    
            res.status(200).send({
                message: 'File song uploaded',
                song: songUpdated
            })
        })
    } else {
        res.status(400).send({message: 'File is not allowed.'})
    }
}

function showFile(req, res) {
    var filename = req.params.filename
    var pathImage = './statics/uploads/songs/' + filename

    fs.exists(pathImage, function(exists) {
        if(!exists) {
            return res.status(404).send({
                message: 'Song not found'
            })
        }

        res.sendFile(path.resolve(pathImage))
    })
}

module.exports = {
    index,
    show,
    save,
    update,
    remove,
    upload,
    showFile
}
