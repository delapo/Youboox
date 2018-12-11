var hostname = 'localhost';
var port = 3000;
var express = require('express');
var app = express();

app.get('/send', function (req, res) {

res.send("that don't work a lot");
});

