'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'MY_SECRET_KEY_API'

exports.ensureAuth = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).send({
            message: 'Forbidden'
        })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        var payload = jwt.decode(token, secret)

        // Verify date
        if(payload.exp < moment().unix()) {
            return res.status(401).send({
                message: 'Token is not valid'
            })    
        }

    } catch(ex) {
        console.log(ex)
        return res.status(404).send({
            message: 'Token not found'
        })
    }


    req.user = payload
    next()
}