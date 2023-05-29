const express = require("express");
const router = express.Router();
const path = require("path");

const {
  getComments,
  postCreateComment,
  deleteComment
} = require("../controller/comment.controller");

router.get("/:id", getComments);
router.post("/create", postCreateComment);

router.delete("/delete/:id", deleteComment);

module.exports = router;
