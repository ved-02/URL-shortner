const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const shortURL = require("./models/url");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));


// let links = ["ved"];
app.get("/", (req, res) => {
    shortURL.find({}, (err, docs) => {
        if (!err) {
            res.status(200).render("index.ejs", { links: docs });
        }
        else {
            console.log("error:", err);
        }
    })
});
app.post("/generate", (req, res) => {
    let newLink = new shortURL({
        name: req.body.name,
        full: req.body.newLink
    });
    newLink.save();
    console.log("saved");
    res.status(200).redirect("/");
});
app.get("/:shorturl", (req, res) => {
    let shortlink = req.params.shorturl;
    shortURL.findOne({ short: shortlink }, (err, link) => {
        if (!err) {
            if (!link) {
                res.status(404).redirect("/");
            }
            if (link) {
                link.click++;
                link.save();
                res.status(200).redirect(`${link.full}`);
            }
        }
    });
});
// MONGOOSE
mongoose.connect('mongodb://localhost:27017/URL', { useNewUrlParser: true });
mongoose.connection.on("open", () => {
    app.listen(80, (err) => {
        if (err)
            console.log(err);
        console.log("port 80");
    });
}); 
