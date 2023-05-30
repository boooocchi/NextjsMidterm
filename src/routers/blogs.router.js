const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); //file image
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./src/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
//     cb(null, fileName);
//   }
// });

const upload = multer({ storage: storage });

const {
  getAllBlog,
  postCreateBlog,
  postEditBlogById,
  deleteBlog,
  getBlogById
} = require("../controller/blog.controller");

router.get("/all", getAllBlog);
router.post("/create", upload.single("image"), postCreateBlog);
router.get("/:id", getBlogById);

router.post("/edit/:id", upload.single("image"), postEditBlogById);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
