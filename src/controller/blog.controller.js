const Blog = require("../model/blog.model");

exports.getAllBlog = (req, res) => {
  Blog.find()
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch blogs" });
    });
};

exports.postCreateBlog = (req, res) => {
  console.log(req.body);

  const { title, author, article, date } = req.body;

  const image = req.file ? req.file : null;

  const newBlog = new Blog(title, author, article, date, image);
  newBlog
    .save()
    .then(() => {
      console.log("success!!");
    })
    .catch((err) => console.error(err.message));
};

exports.postEditBlogById = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const { title, author, article, date } = req.body;
  const image = req.file ? req.file : null;

  const dataToUpdate = { title, author, article, date, image, id };

  Blog.updateOne(dataToUpdate) // Add the query condition here
    .then(() => {
      console.log("successfully updated");
      res.redirect("/");
    })
    .catch((err) => console.error(err.message));
};

exports.deleteBlog = (req, res) => {
  const id = req.params.id;

  Blog.deleteOne(id)
    .then(() => {
      console.log("successfully deleted");
      res.redirect("/");
    })
    .catch((err) => console.error(err.message));
};
