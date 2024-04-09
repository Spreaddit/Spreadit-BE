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

function calculatePostTime(post) {
  const time = (Date.now() - post.date.getTime()) / (1000 * 3600);
  return time;
}

exports.sortPostNew = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find().sort({ date: -1 }).skip(skip).limit(limit);
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    res.status(200).json({
      posts: posts,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTop = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find().exec();
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

    const communityName = req.params.subspreaditname;

    const posts = await Post.find({
      community: communityName,
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
    const communityName = req.params.subspreaditname;
    const posts = await Post.find({ community: communityName })
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

    const posts = await Post.find().sort({ numberOfViews: -1 }).exec();
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
    const posts = await Post.find().sort({ commentsCount: -1 }).exec();
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
    const posts = await Post.find().exec();
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

exports.sortPostRandomCommunity = async (req, res) => {
  try {
    const userId = req.user._id;

    const communityName = req.params.subspreaditname;

    const posts = await Post.find({
      community: communityName,
    }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const pipeline = [
      { $sample: { size: posts.length } }, // $sample stage to randomly select documents
    ];

    // Execute the aggregation pipeline
    const randomPosts = await Post.aggregate(pipeline);

    res.status(200).json(randomPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTopTimeCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.subspreaditname;
    const time = req.params.time;
    let sortTime = 24;
    if (time === "now") sortTime = 1;
    else if (time === "today") sortTime = 24;
    else if (time === "week") sortTime = 24 * 7;
    else if (time === "month") sortTime = 24 * 30;
    else if (time === "year") sortTime = 365 * 24;
    // console.log(sortTime);

    const posts = await Post.find({
      community: communityName,
    }).exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const postsWithTime = posts.map((post) => ({
      ...post.toObject(),
      postTime: calculatePostTime(post),
    }));
    //console.log(postsWithTime);
    const postsToSort = postsWithTime.filter(
      (post) => post.postTime <= sortTime
    );
    if (postsToSort.length == 0) {
      return res.status(404).json({ error: "no posts found" });
      //console.log(postsToSort);
    }
    const sortedPosts = postsToSort.sort((a, b) => {
      return (
        b.votesUpCount - b.votesDownCount - (a.votesUpCount - a.votesDownCount)
      );
    });
    res.status(200).json(sortedPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTopTime = async (req, res) => {
  try {
    const userId = req.user._id;
    const time = req.params.time;
    let sortTime = 24;
    if (time === "now") sortTime = 1;
    else if (time === "today") sortTime = 24;
    else if (time === "week") sortTime = 24 * 7;
    else if (time === "month") sortTime = 24 * 30;
    else if (time === "year") sortTime = 365 * 24;
    // console.log(sortTime);

    const posts = await Post.find().exec();
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const postsWithTime = posts.map((post) => ({
      ...post.toObject(),
      postTime: calculatePostTime(post),
    }));
    //console.log(postsWithTime);
    const postsToSort = postsWithTime.filter(
      (post) => post.postTime <= sortTime
    );
    if (postsToSort.length == 0) {
      return res.status(404).json({ error: "no posts found" });
      //console.log(postsToSort);
    }
    const sortedPosts = postsToSort.sort((a, b) => {
      return (
        b.votesUpCount - b.votesDownCount - (a.votesUpCount - a.votesDownCount)
      );
    });
    res.status(200).json(sortedPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.recentPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("recentPosts");

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const Posts = user.recentPosts;
    recentPosts = Posts.reverse();
    res.status(200).json(recentPosts);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
