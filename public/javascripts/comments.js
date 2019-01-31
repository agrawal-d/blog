$(".comment-box").on('keypress', function(e) {
    if (e.which == 13) {
        submitComment();
    }
});
$(".post-comment").on("click", function() {
    submitComment();
})

function submitComment() {
    var comment = $(".comment-box").val();
    var username = "hereisdx"
    var entry = $(".entry").html()
    if (comment.length < 3) {
        $(".errorMessage").html("Comment must be of atleat 4 characters")
    } else {
        $.ajax({
            url: "/processComment",
            data: { comment: comment, username: username, entry: entry },
            success(data) {
                $(".commentsList").prepend(data)
                $(".errorMessage").html("Comment Posted")
                $(".comment-box").val("");
            },
            error(xhr) {
                $(".errorMessage").html("Error: " + xhr.status)
            }
        })
    }
}