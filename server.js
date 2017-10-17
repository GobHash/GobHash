var express = require('express');
var app = express();

// app.use(express.static("public"));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.redirect('/');
});

// use port 8080 unless there exists a preconfigured port
var port = process.env.PORT || 8080;

app.listen(port);

// app.listen(8080, 'localhost');
console.log("Gobhash listening at: " + port);
