'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        artist: {
            type: Schema.ObjectId,
            ref: 'Artist'
        }
    }
})

module.exports = mongoose.model('Album', AlbumSchema)
