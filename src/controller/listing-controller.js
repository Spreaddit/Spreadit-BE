const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.sortPostNew = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
