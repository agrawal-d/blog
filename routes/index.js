var express = require('express');
var router = express.Router();
var db_exported = require('../mongoose.js')
var blogPostsCollection
var blog_model = require("./blog_model.js");
var db = db_exported.db
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
    console.log(req.body)
        //console.log(message);
    res.render('index', { title: 'Home', message: req.query.msg, blogData: blogPostsCollection });
});

module.exports = router;