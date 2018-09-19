'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/mean-project', { useNewUrlParser: true }, (err, res) => {
    if(err) {
        throw err
    } else {
        console.log('Connect!')

        app.listen(port, function() {
            console.log('Listen on http://localhost:',port);
        })
    }
})
