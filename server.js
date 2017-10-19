var express = require('express');
<<<<<<< HEAD
=======
var favicon = require('serve-favicon')
var path = require('path')

>>>>>>> master
var app = express();

// app.use(express.static("public"));
app.use(express.static(__dirname));
<<<<<<< HEAD
=======
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
>>>>>>> master

app.get('/', function (req, res) {
    res.redirect('/');
});

// use port 8080 unless there exists a preconfigured port
var port = process.env.PORT || 8080;

app.listen(port);

// app.listen(8080, 'localhost');
console.log("Gobhash listening at: " + port);
