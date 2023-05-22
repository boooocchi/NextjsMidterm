const router = require("express").Router();

const {
  getAllBlog,
  getCreateBlog,
  postCreateBlog,
  getEditBlogById,
  postEditBlogById,
  deleteBlog
} = require("../controller/blogs.controller");

router.get("/all", getAllBlog);
// router.route("/post").get(getCreateBlog).post(postCreateBlog);
// router.route("/edit/:id").get(getEditBlogById).post(postEditBlogById);
// router.delete("/delete/:id", deleteBlog);

module.exports = router;
