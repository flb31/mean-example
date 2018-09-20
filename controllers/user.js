'use strict'

var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')

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
        res.status(400).send({message: 'Password is required'})
        return
    }

    if(!user.name) {
        res.status(400).send({message: 'Name is required'})
        return
    }

    if(!user.surname) {
        res.status(400).send({message: 'Surname is required'})
        return
    }

    if(!user.email) {
        res.status(400).send({message: 'Email is required'})
        return
    }

    // encrypt
    bcrypt.hash(params.password, null, null, function(err, hash) {
        user.password = hash

        user.save( (err, userStored) => {
            if(err) {
                res.status(500).send({message: 'Error save user'})
                return
            }

            if(!userStored) {
                res.status(404).send({message: 'User not found'})
                return
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
        res.status(400).send({
            message: 'Email or password is not valid.'
        })
        return
    }

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if(err) {
            res.status(500).send({
                message: 'Error login'
            })
            return
        }

        if(!user) {
            res.status(404).send({
                message: 'User not found'
            })
            return
        }

        bcrypt.compare(password, user.password, (err, check) => {
            if(check) {

                if(params.gethash) {
                    // JWT token
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

module.exports = {
    index,
    save,
    login
}
