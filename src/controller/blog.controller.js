const Blog = require("../model/blog.model");

exports.getAllBlog = (req, res) => {
  Blog.find()
    .then(({ rows }) => {
      const remappedRows = rows.map((row) => {
        const imageData = row.image;
        const base64Image = Buffer.from(imageData).toString("base64");
        const imageSrc = `data:${row.image_mime};base64, ${base64Image}`;
        return {
          ...row,
          image: imageSrc
        };
      });
      res.json(remappedRows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch blogs" });
    });
};

exports.getBlogById = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(({ rows }) => {
      const imageData = rows[0].image;
      const base64Image = Buffer.from(imageData).toString("base64");
      const imageSrc = `data:${rows[0].image_mime};base64, ${base64Image}`;
      res.json({
        ...rows[0],
        image: imageSrc,
        originalImg: imageData
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "failed to fetch blog" });
    });
};

exports.postCreateBlog = (req, res) => {
  const { title, author, article, date } = req.body;
  const { buffer: image, mimetype } = req.file || null;

  const newBlog = new Blog(title, author, article, date, image, mimetype);
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
  let image = null;
  let mimetype = null;
  if (req.file) {
    ({ buffer: image, mimetype } = req.file);
  }

  const dataToUpdate = { id, title, author, article, date, image, mimetype };

  Blog.updateOne(dataToUpdate) // Add the query condition here
    .then(() => {
      console.log("successfully updated");
      res.redirect(`/aritcle/${id}`);
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
