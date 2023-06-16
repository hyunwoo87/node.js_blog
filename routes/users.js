const express = require("express");

const router = express.Router();

const users = [
  {
    usersId: 1,
    name: "드웨인 존슨",
    title: "Hi",
    content: "Nice to mee to",
    date: new Date("2020-04-21"),
  },
  {
    usersId: 2,
    name: "마르코 로이스",
    title: "der Frieden",
    content: "Freut mich, Sie kennen zu lernen",
    date: new Date("2021-05-11"),
  },
  {
    usersId: 3,
    name: "알프레드 노벨",
    title: "lugn",
    content: "det var angenämt att träffas",
    date: new Date("1999-12-31"),
  },
  {
    usersId: 4,
    name: "박지성",
    title: "안녕하세요",
    content: "반갑습니다",
    date: new Date("2002-06-04"),
  },
  {
    usersId: 5,
    name: "폴 메카트니",
    title: "Hello",
    content: "Nice to mee to",
    date: new Date("2018-05-07"),
  },
];

router.get("/users", (req, res) => {
  res.json({ users });
});

router.get("/users/:usersId", (req, res) => {
  const { usersId } = req.params;
  const [detail] = users.filter((users) => Number(usersId) === users.usersId);

  res.status(200).json({ detail });
});

const Comment = require("../schemas/comment.js");
router.post("/users/:usersId/comment", async (req, res) => {
  const { usersId } = req.params;
  const { quantity } = req.body;

  const existsComment = await Comment.find({ usersId });
  if (existsComment.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "게시글이 존재 합니다" });
  }

  await Comment.create({ usersId, quantity });

  res.json({ result: "작성 되었습니다" });
});

router.put("/users/:usersId/comment", async (req, res) => {
  const { usersId } = req.params;
  const { quantity } = req.body;

  const existsComment = await Comment.find({ usersId });
  if (existsComment.length) {
    await Comment.updateOne(
      { usersId: usersId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

router.delete("/users/:usersId/comment", async (req, res) => {
  const { usersId } = req.params;

  const existsComment = await Comment.find({ usersId });
  if (existsComment.length) {
    await Comment.deleteOne({ usersId });
  }
  res.json({ result: "success" });
});

const Users = require("../schemas/users.js");
router.post("/users/", async (req, res) => {
  const { usersId, name, title, content, date } = req.body;

  const users = await Users.find({ usersId });

  if (users.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 ID",
    });
  }

  const createUsers = await Users.create({
    usersId,
    name,
    content,
    title,
    date: new Date(),
  });

  res.json({ users: createUsers });
});

module.exports = router;
