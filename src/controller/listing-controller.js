const Community = require("../models/community");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.sortPostNew = async (req, res) => {
  try {
    const posts = await Post.find({ type: "post" }).sort({ date: -1 }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTop = async (req, res) => {
  try {
    const posts = await Post.find({ type: "post" }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    posts.sort((a, b) => {
      return (
        b.votesUpCount - b.votesDownCount - (a.votesUpCount - a.votesDownCount)
      );
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTopCommunity = async (req, res) => {
  try {
    const communityName = req.params.subspreaditname;
    const posts = await Post.find({
      community: communityName,
      type: "post",
    }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    posts.sort((a, b) => {
      return (
        b.votesUpCount - b.votesDownCount - (a.votesUpCount - a.votesDownCount)
      );
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostNewCommunity = async (req, res) => {
  try {
    const communityName = req.params.subspreaditname;
    const posts = await Post.find({ community: communityName, type: "post" })
      .sort({ date: -1 })
      .exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostViews = async (req, res) => {
  try {
    const posts = await Post.find({ type: "post" })
      .sort({ numberOfViews: -1 })
      .exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostComment = async (req, res) => {
  try {
    const posts = await Post.find({ type: "post" })
      .sort({ commentsCount: -1 })
      .exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
