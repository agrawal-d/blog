var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var entry = require('./routes/entry');
var publishBlog = require("./routes/publishBlog")

var processComment = require('./routes/processComment');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');



var app = express();

var mongoose = require('mongoose');
var exports = module.exports
var googleSchema = new mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    googleId: Number,
    photo: String,
    special: Number
})
var googleUser = mongoose.model('googleUser', googleSchema);
mongoose.connect('mongodb://localhost/microblogging');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});





var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: "586689178666-stcp8c2jh4ksf8k0bl0ijua9lh2r69m1.apps.googleusercontent.com",
        clientSecret: "vIbrTWlZK40ESogFbsseOETs",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        /*User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return cb(err, user);
        });*/
        console.log("Next step to find user")
        googleUser.findOne({
            googleId: profile.id
        }, function(err, user) {
            if (err) {
                return cb(err)
            } else {
                if (!user) {
                    console.log("No user")
                        //console.log(profile._json.image.url)
                    user = new googleUser({
                        id: profile.id,
                        googleId: profile.id,
                        name: profile.displayName,
                        username: profile.name.givenName,
                        photo: profile._json.image.url,
                        special: 1
                    })
                    user.save(function(err) {
                        if (err) console.log(err)
                        console.log("User saved")
                        return cb(err, user)

                    })
                } else {
                    console.log("Already Present user")
                    return cb(err, user)
                }

            }
        })
        console.log(profile)
    }
));

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        accessType: 'offline'
    })


);



app.get('/auth/google/callback',
    //passport.authenticate('google', { failureRedirect: '/login' }),
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        accessType: 'offline',
        failireRedirect: '/login'
    }),

    function(req, res) {
        // Successful authentication, redirect home.
        console.log("USER DATA IS THIS>", req.user.username)
        req.session.save(function() {
            res.redirect('/');
        });

        // req.session.save()
        // res.redirect('/')
    });






app.use('/', index);
app.use('/users', users);
app.use('/entry*', entry);
app.use('/processComment', processComment);

app.get("/newBlog", function(req, res) {
    if (req.user) {
        res.render('newBlog', { user: req.user, title: "Write a new blog post" })
    } else {
        res.redirect("/login")
    }

})
app.use("/publishBlog", publishBlog);

//app.use("/entry*", entry)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;