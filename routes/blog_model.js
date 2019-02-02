var mongoose = require('mongoose');
var exports = module.exports
var blogSchema = new mongoose.Schema({
    heading: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [{ body: String, author: String, date: { type: Date, default: Date.now } }],
    special: String,
    specialInt: Number
})
exports.blogPost = mongoose.model('blogPost', blogSchema);