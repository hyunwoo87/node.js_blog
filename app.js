const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./routes/users");
const commentRouter = require("./routes/comment.js");
const connect = require("./schemas/index.js");
connect();

app.use(express.json());
app.use("/api", [usersRouter, commentRouter]);

app.get("/", (req, res) => {
  res.send("현우의 BLOG");
});

app.listen(port, () => {
  console.log(port, "블로그가 열렸습니다");
});

module.exports = connect;
