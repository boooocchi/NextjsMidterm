const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
// Parse JSON request bodies
app.use(express.json());

const blogsRouter = require("./src/routers/blogs.router");

const commentRouter = require("./src/routers/comment.router");

const userRouter = require("./src/routers/user.router");

app.use(methodOverride("_method"));
const PORT = process.env.PORT || 8000;

app.use("/api", express.static(path.join(process.cwd(), "src", "uploads")));
app.use("/api/blogs", blogsRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("server started"));
