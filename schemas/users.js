const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  usersId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    Number,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
