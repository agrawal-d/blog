var express = require('express');
var router = express.Router();
var db_exported = require('../mongoose.js')
var db = db_exported.db



var blogPostsCollection
var blog_model = require("./blog_model.js");
/* GET home page. */


router.get('/', function(req, res, next) {
    /*var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/microblogging');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));*/
    var blogHeading = req.query.title
    blog_model.blogPost.findOne({ heading: blogHeading }, function(err, blogPost) {
        if (err) return console.error(err);
        if (req.user) {
            res.render('entry', { title: 'Blog Entry', message: req.query.msg, entry: blogPost, user: req.user });
        } else {
            res.render('entry', { title: 'Blog Entry', message: req.query.msg, entry: blogPost });
        }

    })


});

module.exports = router