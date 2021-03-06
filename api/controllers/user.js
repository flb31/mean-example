'use strict'

var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')
var fs = require('fs')
var path = require('path')

function index(req, res) {
    res.status(200).send({
        message: 'User'
    })
}

function save(req, res) {
    var user = new User()

    var params = req.body

    user.name = params.name
    user.surname = params.surname
    user.email = params.email
    user.role = 'ROLE_USER'
    user.image = null

    if(!params.password) {
        return res.status(400).send({message: 'Password is required'})
    }

    if(!user.name) {
        return res.status(400).send({message: 'Name is required'})
    }

    if(!user.surname) {
        return res.status(400).send({message: 'Surname is required'})
    }

    if(!user.email) {
        return res.status(400).send({message: 'Email is required'})
    }

    // encrypt
    bcrypt.hash(params.password, null, null, function(err, hash) {
        user.password = hash

        user.save( (err, userStored) => {
            if(err) {
                return res.status(500).send({message: 'Error save user'})
            }

            if(!userStored) {
                return res.status(404).send({message: 'User not found'})
            }

            res.status(201).send({ user: userStored })
        })
    })
}

function login(req, res) {
    var params = req.body

    var email = params.email
    var password = params.password


    if(!email || !password) {
        return res.status(400).send({
            message: 'Email or password is not valid.'
        })
    }

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if(err) {
            return res.status(500).send({
                message: 'Error login'
            })
        }

        if(!user) {
            return res.status(404).send({
                message: 'User not found'
            })
        }

        bcrypt.compare(password, user.password, (err, check) => {
            if(check) {

                if(params.gethash) {
                    // JWT token
                    res.status(200).send({
                        token: jwt.createToken(user)
                    })
                } else {
                    res.status(200).send({user})
                }
            } else {
                res.status(404).send({
                    message: 'User not login'
                })
            }
        })
    })
}

function update(req, res) {
    var userId = req.params.id
    var user = req.body

    User.findByIdAndUpdate(userId, user, (err, userUpdated) => {
        if(err || !userUpdated) {
            return res.status(500).send({
                message: 'Error updating User'
            })
        }

        res.status(200).send({
            message: 'User updated',
            user: userUpdated
        })
    })
}


function upload(req, res) {
    var userId = req.params.id
    var filename = 'undefined-filename'

    if(!req.files || !req.files.image) {
        return res.status(404).send({
            message: 'File not found'
        })
    }

    var filePath = req.files.image.path
    filename = filePath.split('/')[3]

    User.findByIdAndUpdate(userId, {image: filename}, (err, userUpdated) => {
        if(err || !userUpdated) {
            return res.status(500).send({
                message: 'Error upload image User'
            })
        }

        res.status(200).send({
            message: 'Update image ',
            user: userUpdated
        })
    })
    
}

function showImage(req, res) {
    var filename = req.params.filename
    var pathImage = './statics/uploads/users/' + filename

    fs.exists(pathImage, function(exists) {
        if(!exists) {
            return res.status(404).send({
                message: 'Image not found'
            })
        }

        res.sendFile(path.resolve(pathImage))
    })
}

function test(req, res) {
    return res.send({
        message: 'User is logged'
    })
}

module.exports = {
    index,
    save,
    update,
    login,
    upload,
    showImage,
    test,
}
