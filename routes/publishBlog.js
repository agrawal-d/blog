var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoodb_exported = require("../mongoose")
var blog_model = require("./blog_model.js");

var name;

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, req.body.heading);
    }
});

var upload = multer({
    storage: Storage
})

router.post('/', upload.single("image"), function(req, res, next) {
    if (req.file) {
        image = "/images/" + req.body.heading
    } else {
        image = "no"
    }
    console.log("Make sure to CHMOD for file permissions upload safety")
    name = req.body.heading
    var blogPost = new blog_model.blogPost({
        heading: req.body.heading,
        author: req.user.username,
        body: req.body.body,
        special: image
    })
    blogPost.save(function(err, response) {
        if (err) console.log(err)
        else console.log(response)
    })
    var location = "/entry/?title=" + encodeURIComponent(req.body.heading)
    res.redirect(location)
});
module.exports = router