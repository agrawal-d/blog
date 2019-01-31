var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microblogging');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var blogPostsCollection
var blog_model = require("./blog_model.js");

db.once('open', function() {
    /*entry.save(function(err, entry) {
        if (err) return console.err(err)
        console.log("Done");
    });*/

    blog_model.blogPost.find(function(err, blogPosts) {
        if (err) return console.error(err);
        blogPostsCollection = blogPosts
    })

});

/* GET home page. */


router.get('/', function(req, res, next) {
    var blogHeading = req.query.title
    console.log(blogHeading)
    var blog_model = require("./blog_model.js");
    blog_model.blogPost.findOne({ heading: blogHeading }, function(err, blogPost) {
        if (err) return console.error(err);
        res.render('entry', { title: 'Blog Entry', message: req.query.msg, entry: blogPost });
    })

});

module.exports = router