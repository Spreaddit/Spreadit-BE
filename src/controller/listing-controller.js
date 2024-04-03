const Community = require("../models/community");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function calculateHotnessScore(post) {
  const ageInHours = post.date.getTime() / (1000 * 3600);
  const upvotes = post.votesUpCount;
  const downvotes = post.votesDownCount;

  const upvoteWeight = 1;
  const downvoteWeight = -1;
  const ageWeight = 0.2;

  return (
    upvotes * upvoteWeight + downvotes * downvoteWeight + ageInHours * ageWeight
  );
}

exports.sortPostNew = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }

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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
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
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
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

exports.sortPostBest = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
    const posts = await Post.find({ type: "post" }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    posts.sort((a, b) => {
      const ratioA =
        a.votesDownCount !== 0
          ? a.votesUpCount / a.votesDownCount
          : a.votesUpCount;
      const ratioB =
        b.votesDownCount !== 0
          ? b.votesUpCount / b.votesDownCount
          : b.votesUpCount;

      return ratioB - ratioA;
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostHot = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }
    const posts = await Post.find().exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const postsWithScores = posts.map((post) => ({
      ...post.toObject(),
      hotnessScore: calculateHotnessScore(post),
    }));
    const sortedPosts = postsWithScores.sort((a, b) => {
      return b.hotnessScore - a.hotnessScore;
    });
    res.status(200).json(sortedPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostHotCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "please login first" });
    }

    const communityName = req.params.subspreaditname;

    const posts = await Post.find({
      community: communityName,
    }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const postsWithScores = posts.map((post) => ({
      ...post.toObject(),
      hotnessScore: calculateHotnessScore(post),
    }));
    const sortedPosts = postsWithScores.sort((a, b) => {
      return b.hotnessScore - a.hotnessScore;
    });
    res.status(200).json(sortedPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
