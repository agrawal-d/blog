var express = require('express');
var router = express.Router();
var db_exported = require('../mongoose.js')
var db = db_exported.db
var blogPostsCollection
var blog_model = require("./blog_model.js");
var blog = blog_model.blogPost;


router.get('/', function(req, res, next) {
    var body = req.query.comment
    var author = req.query.username
    var entry = req.query.entry
    var currentEntry = blog.findOne({ heading: entry }, function(err, response) {
        if (err) {
            console.error("BLOG NOT FOUND: ", err)
        } else {

            var id = response.id;
            blog.findById(id, function(err, data) {
                data.comments.push({ body: body, author: author })
                data.save(function(err, success) {
                    if (err) console.err(err)
                    else console.log("comment saved")
                })
            })

        }
    })
    res.render('commentResponse', { body: body, author: author });

});

module.exports = router