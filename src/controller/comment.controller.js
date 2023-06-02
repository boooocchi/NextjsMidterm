const Comment = require("../model/comment.model");

exports.getComments = (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "failed to fetch blog" });
    });
};

exports.postCreateComment = (req, res) => {
  console.log(req.body);
  const { comment, commenter, blog_id, user_id } = req.body;

  const newComment = new Comment(comment, commenter, blog_id, user_id);
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
      console.log("Successfully deleted the comment");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};
