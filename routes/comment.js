const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");
const Users = require("../schemas/users.js");

router.get("/comment", async (req, res) => {
  const comment = await Comment.find({});
  const usersIds = comment.map((comment) => {
    return comment.usersId;
  });

  const users = await Users.find({ usersId: usersIds });

  const results = comment.map((comment) => {
    return {
      quantity: comment.quantity,
      users: users.find((item) => item.usersId === comment.usersId),
    };
  });

  res.json({
    comment: results,
  });
});

module.exports = router;
