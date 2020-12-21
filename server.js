//Express Dependencies Setup
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var path = require("path");

//Middleware!(tm)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
//API routes!
app.get("/api/notes", function(req, res) {
    res.json();
});

app.post("/api/notes", function(req, res) {
    res.json();
});

app.delete("/api/notes/:id", function(req, res) {
    res.json();
});

//HTML routes!
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//IF NO MATCH, go index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});