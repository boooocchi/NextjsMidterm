const Comment = require("../model/comment.model");

exports.getComments = (req, res) => {
  Comment.findById()
    .then((rows) => {
      res.json();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "failed to fetch blog" });
    });
};

exports.postCreateComment = (req, res) => {
  const { comment, commenter, blog_id } = req.body;

  const newComment = new Comment(comment, commenter, blog_id);
  newComment
    .save()
    .then(() => {
      console.log("successfully create a comment");
    })
    .catch((err) => console.error(err.message));
};

exports.deleteComment = (req, res) => {
  const id = req.params.id;
  Comment.deleteOne(id)
    .then(() => {
      console.log("successfully delete the comment");
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err.message);
    });
};
