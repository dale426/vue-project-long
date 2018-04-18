const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser'); // 请求体解析
app.set('port', 3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./router')(app)


app.listen(port, function() {
    console.log("listen port:" + port)
})