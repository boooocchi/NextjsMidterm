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

exports.getCreateBlog = (req, res) => {
  res.render("create", { model: {} });
};

exports.postCreateBlog = (req, res) => {
  const { title, author, article, date, image } = req.body;

  const newBlog = new Blog(title, author, article, date, image);
  newBlog
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err.message));
};

exports.getEditBlogById = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => console.error(err.message));
};

exports.postEditBlogById = (req, res) => {
  const id = req.params.id;
  const { title, author, article, date, image } = req.body;

  const dataToUpdate = { id, title, author, article, date, image };

  Blog.updateOne(dataToUpdate)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err.message));
};

exports.deleteBlog = (req, res) => {
  const id = req.params.id;

  Blog.deleteOne(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err.message));
};
