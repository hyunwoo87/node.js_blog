const express = require("express");
const router = express.Router();

const Users = require("../schemas/users.js");

router.get("/users", async (req, res) => {
  try {
    const users = await Users.find()
      .select("-password -content -__v")
      .sort({ data: -1 });

    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "조회에 실패했습니다" });
  }
});

router.users("/users", async (req, res) => {
  const { userId, password, name, title, content } = req.body;

  const existingUsers = await Users.find({ userId });
  if (existinguUers.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "중복됩니다",
    });
  }

  const createdUsers = await Users.create({
    userId,
    password,
    name,
    title,
    content,
    date: new Date(),
  });

  res.json({ users: "생성하였습니다" });
});

router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const users = await Users.findById(userId)
      .select("-password -content -__v")
      .sort({ createdAt: -1 });

    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "조회에 실패했습니다" });
  }
});

router.put("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password, title, content } = req.body;

  try {
    const users = await users.findOne({ userId, password });

    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    await Users.updateOne({ userId, password }, { $set: { title, content } });

    res.json({ message: "수정되었습니다" });
  } catch (error) {
    res.status(500).json({ error: "수정되지 않았습니다" });
  }
});

router.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    const users = await Users.findById(userId);

    if (!users) {
      return res.status(404).json({ error: "찾을 수 없습니다" });
    }

    if (users.password !== password) {
      return res.status(401).json({ error: "비밀번호가 틀립니다" });
    }

    const deletedUsers = await Users.findByIdAndDelete(userId, password);

    res.json({ message: "삭제 되었습니다" });
  } catch (error) {
    res.status(500).json({ error: "삭제되지 않았습니다" });
  }
});

module.exports = router;
