const express = require("express");
const app = express();
const blogsRouter = require("./src/routers/blogs.router");

const PORT = process.env.PORT || 8000;

// app.get("/api/blogs", (req, res) => res.json({ msg: "blogs" }));

//fetch all the blog info and make json file in /blogs/all
app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => console.log("server started"));
