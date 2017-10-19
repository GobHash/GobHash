var express = require('express');
var favicon = require('serve-favicon')
var path = require('path')

var app = express();

// app.use(express.static("public"));
app.use(express.static(__dirname));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', function (req, res) {
    res.redirect('/');
});

// use port 8080 unless there exists a preconfigured port
var port = process.env.PORT || 8080;

app.listen(port);

// app.listen(8080, 'localhost');
console.log("Gobhash listening at: " + port);
