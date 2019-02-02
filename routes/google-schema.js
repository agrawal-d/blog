var mongoose = require('mongoose');
var exports = module.exports
var googleSchema = new mongoose.Schema({
    googleId: Number,
    accessToken: String,
    fullName: String,
    firstName: String,
    lastName: String,
    profilePic: String
})
exports.googleProfile = mongoose.model('googleProfile', googleSchema);