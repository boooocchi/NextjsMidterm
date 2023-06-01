const express = require("express");
const router = express.Router();

const { getUser, registerUser } = require("../controller/user.controller");

router.post("/login", getUser);
router.post("/register", registerUser);

module.exports = router;
