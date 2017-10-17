var express = require('express');
var app = express();

// app.use(express.static("public"));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.redirect('/');
});

app.listen(8080, 'localhost');
console.log("MyProject Server is Listening on port 8080");
