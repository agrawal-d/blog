var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var db_exported = require('../mongoose.js')
var blogPostsCollection
var blog_model = require("./blog_model.js");
var db = db_exported.db
db.once('open', function() {
    /*entry.save(function(err, entry) {
        if (err) return zsole.err(err)
        console.log("Done");
    });*/

    blog_model.blogPost.find(function(err, blogPosts) {
        if (err) return console.error(err);
        blogPostsCollection = blogPosts
    })

});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("AT INDEX.JS>", req.user)
        //console.log(message);
    res.render('index', { title: 'Home', message: req.query.msg, blogData: blogPostsCollection, user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', {});
});
router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account: account });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});
router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});


module.exports = router;