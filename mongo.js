var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microblogging');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var Schema = mongoose.Schema;

var blogSchema = new Schema({
    heading: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [{ body: String, author: String, date: { type: Date, default: Date.now } }],
    special: String,
    specialInt: Number
})

var blogPost = mongoose.model("blogPost", blogSchema)
var entry = new blogPost({
    heading: "Dated World!",
    author: "Divyanshu Agrawal",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatibus ea nostrum eos architecto eum maxime, quibusdam incidunt inventore quis suscipit? Veniam quo facere quibusdam earum iste placeat debitis nostrum.",
    comments: [{ body: "Nice One", author: "John" }],
    special: "no",
    specialInt: 1
});

db.once('open', function() {
    /*entry.save(function(err, entry) {
        if (err) return console.err(err)
        console.log("Done");
    });*/

    blogPost.find(function(err, blogPosts) {
        if (err) return console.error(err);
        console.log(blogPosts[0].heading)
    })

});