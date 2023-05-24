const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
    cb(null, fileName); // Generate a unique filename with the desired extension for the uploaded file
  }
});

const upload = multer({ storage: storage });

// Import controller functions
const {
  getAllBlog,
  postCreateBlog,
  getEditBlogById,
  postEditBlogById,
  deleteBlog
} = require("../controller/blog.controller");

// Define routes
router.get("/all", getAllBlog);
router.post("/create", upload.single("image"), postCreateBlog);
router.get("/edit/:id", getEditBlogById);
router.post("/edit/:id", postEditBlogById);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
