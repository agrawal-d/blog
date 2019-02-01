var mongoose = require('mongoose');
var exports = module.exports
mongoose.connect('mongodb://localhost/microblogging');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.db = db;