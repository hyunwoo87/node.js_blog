const express = require("express");
const router = express.Router();
const Users = require("../schemas/users.js");
const Comments = require("../schemas/comment.js");

router.get("/users/:userId/comment", async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await Users.findById(userId);
    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다." });
    }

    const comments = await Comments.find({ commentId })
      .select("commentId -__v")
      .sort({ date: -1 });

    res.json({ data: comments });
  } catch (error) {
    res.status(500).json({ error: "조회에 실패했습니다." });
  }
});

router.users("/users/:userId/comment", async (req, res) => {
  const { userId, comment } = req.body;
  const { commentId } = req.params;

  if (!comment) {
    return res.status(400).json({
      success: false,
      error: "코멘트를 입력해주세요",
    });
  }

  try {
    const users = await Users.findById(userId);
    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    await Comments.create({
      commentId,
      title,
      comment,
      date: new Date(),
    });

    res.json({ message: "작성하였습니다" });
  } catch (error) {
    res.status(500).json({ error: "실패했습니다" });
  }
});

router.put("/users/:usersId/comment/:commentId", async (req, res) => {
  const { user, comment } = req.body;
  const { userId, commentId } = req.params;

  try {
    const users = await Users.findById(userId);
    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다." });
    }

    const existingComment = await Comments.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    existingComment.user = user;
    existingComment.comment = comment;
    await existingComment.save();

    res.json({ message: "수정하였습니다" });
  } catch (error) {
    res.status(500).json({ error: "수정에 실패했습니다" });
  }
});

router.delete("/users/:usersId/comment/:commentId", async (req, res) => {
  const { usersId, commentId } = req.params;

  try {
    const users = await Users.findById(usersId);
    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    const existingComment = await Comments.findOne({ commentId });
    if (!existingComment) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    await Comments.deleteOne({ commentId });

    res.status(200).json({ message: "삭제하였습니다" });
  } catch (error) {
    res.status(500).json({ error: "삭제에 실패했습니다" });
  }
});

module.exports = router;
