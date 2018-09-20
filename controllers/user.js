'use strict'

function test(req, res) {
    res.status(200).send({
        message: 'Test action'
    })
}

module.exports = {
    test
}
