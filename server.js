const fs = require("fs");

//Express Dependencies Setup
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var path = require("path");

//Middleware!(tm)
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Routes
//API routes!
app.get("/api/notes", function(req, res) {
    //read file & parse to obj to send to browser
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let dataObj = JSON.parse(data);
        res.json(dataObj);
    });
});

app.post("/api/notes", function(req, res) {
    //get `req.body` into a variable
    let newNote = req.body;
    //get exsisting db.json file into object (return parsed file to let `dataObj`)
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let dataObj = JSON.parse(data);
        //push `newNote` into `dataObj`
        dataObj.push(newNote);

        let updateDB = JSON.stringify(dataObj);

        //make the new `dataObj` into json and save to db.json
        fs.writeFile("./db/db.json", updateDB, (err) => {
            if (err) throw err;
            console.log("data written hopefully...");
        });  
    });
    //send updated note list back to client
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let dataObj = JSON.parse(data);
        res.json(dataObj);
    });
});

app.delete("/api/notes/:id", function(req, res) {
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