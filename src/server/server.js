var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
const mongoose = require('mongoose')
var app = express()

// app.set('port', 3000)
mongoose.Promise = require('bluebird')

try {
    mongoose.connect('mongodb://localhost/vue-project-long')
} catch (error) {
    console.log(error)
}

// mongoose.connection
//     .once('open', function() {
//         console.log("mongoose connection")
//     })
//     .on('error', function(error){
//         throw error
//     })


app.get('/', function(req, res) {
    return res.json('hello word')
})


app.listen(port, function() {
    console.log("listen port:" + port)
})