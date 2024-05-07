const Community = require("../models/community");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function calculateHotnessScore(post) {
  const ageInHours = post.date.getTime() / (1000 * 3600);
  const upvotes = post.upVotes.length;
  const downvotes = post.downVotes.length;

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
    const page = req.query.page || 4;
    const limit = 10;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const user = await User.findById(userId);
    const postInfoArray = await Promise.all(
      posts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );
    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);
    res.status(200).json({
      posts: filteredPostInfoArray,
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
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    });

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    // Sort the posts by the difference between upvotes and downvotes
    posts.sort((a, b) => {
      return (
        b.upVotes.length -
        b.downVotes.length -
        (a.upVotes.length - a.downVotes.length)
      );
    });

    // Calculate total pages for pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    // Paginate the sorted posts
    const paginatedPosts = posts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.sortPostTopCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.subspreaditname;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!communityName) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: communityName });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    const userIsMember = communityExists.members.includes(userId);

    if (!userIsMember && communityExists.communityType === "Private") {
      return res.status(403).json({ message: "Unauthorized to see posts" });
    }
    if (isModeratorOrCreator) {
      posts = await Post.find({ community: communityName });
    } else {
      posts = await Post.find({ community: communityName, isApproved: true });
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "no posts found in this community" });
    }

    posts.sort((a, b) => {
      return (
        b.upVotes.length -
        b.downVotes.length -
        (a.upVotes.length - a.downVotes.length)
      );
    });

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = posts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostNewCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.subspreaditname;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!communityName) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: communityName });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    const userIsMember = communityExists.members.includes(userId);

    if (!userIsMember && communityExists.communityType === "Private") {
      return res.status(403).json({ message: "Unauthorized to see posts" });
    }
    if (isModeratorOrCreator) {
      posts = await Post.find({ community: communityName })
        .sort({ date: -1 })
        .exec();
    } else {
      posts = await Post.find({ community: communityName, isApproved: true })
        .sort({ date: -1 })
        .exec();
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "no posts found in this community" });
    }

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = posts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostViews = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    })
      .sort({ numberOfViews: -1 })
      .exec();

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const visiblePosts = posts.filter(
      (post) => !post.hiddenBy.includes(userId)
    );

    const paginatedPosts = visiblePosts.slice(skip, skip + limit);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    })
      .sort({ commentsCount: -1 })
      .exec();

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = posts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostBest = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    }).exec();

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    posts.sort((a, b) => {
      const ratioA =
        a.downVotes.length !== 0
          ? a.upVotes.length / a.downVotes.length
          : a.upVotes.length;
      const ratioB =
        b.downVotes.length !== 0
          ? b.upVotes.length / b.downVotes.length
          : b.upVotes.length;

      return ratioB - ratioA;
    });

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = posts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostHot = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    }).exec();

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    const sortedPosts = posts.sort((a, b) => {
      const hotnessScoreA = calculateHotnessScore(a);
      const hotnessScoreB = calculateHotnessScore(b);
      return hotnessScoreB - hotnessScoreA;
    });

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.sortPostHotCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.subspreaditname;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    if (!communityName) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: communityName });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    const userIsMember = communityExists.members.includes(userId);

    if (!userIsMember && communityExists.communityType === "Private") {
      return res.status(403).json({ message: "Unauthorized to see posts" });
    }
    if (isModeratorOrCreator) {
      posts = await Post.find({ community: communityName })
        .sort({ date: -1 })
        .exec();
    } else {
      posts = await Post.find({ community: communityName, isApproved: true })
        .sort({ date: -1 })
        .exec();
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "no posts found in this community" });
    }

    const sortedPosts = posts.sort((a, b) => {
      const hotnessScoreA = calculateHotnessScore(a);
      const hotnessScoreB = calculateHotnessScore(b);
      return hotnessScoreB - hotnessScoreA;
    });

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostRandomCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityName = req.params.subspreaditname;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    if (!communityName) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: communityName });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    const userIsMember = communityExists.members.includes(userId);

    if (!userIsMember && communityExists.communityType === "Private") {
      return res.status(403).json({ message: "Unauthorized to see posts" });
    }
    if (isModeratorOrCreator) {
      posts = await Post.find({ community: communityName })
        .sort({ date: -1 })
        .exec();
    } else {
      posts = await Post.find({ community: communityName, isApproved: true })
        .sort({ date: -1 })
        .exec();
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "no posts found in this community" });
    }
    const pipeline = [{ $sample: { size: posts.length } }];
    const randomPostIds = await Post.aggregate(pipeline);

    const postIds = randomPostIds.map((randomPost) => randomPost._id);

    const randomPosts = await Post.find({ _id: { $in: postIds } });

    const user = await User.findById(userId);

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = randomPosts.slice(skip, skip + limit);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.sortPostTopTimeCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const communityName = req.params.subspreaditname;
    const time = req.params.time;
    let sortTime = 24;
    if (time === "now") sortTime = 1;
    else if (time === "day") sortTime = 24;
    else if (time === "week") sortTime = 24 * 7;
    else if (time === "month") sortTime = 24 * 30;
    else if (time === "year") sortTime = 365 * 24;
    if (!communityName) {
      return res.status(400).json({ error: "Community name is required" });
    }

    const communityExists = await Community.findOne({ name: communityName });

    if (!communityExists) {
      return res.status(404).json({ message: "Community not found" });
    }

    let posts;

    const isModeratorOrCreator =
      communityExists.moderators.includes(userId) ||
      userId.equals(communityExists.creator);

    const userIsMember = communityExists.members.includes(userId);

    if (!userIsMember && communityExists.communityType === "Private") {
      return res.status(403).json({ message: "Unauthorized to see posts" });
    }
    if (isModeratorOrCreator) {
      posts = await Post.find({ community: communityName })
        .sort({ date: -1 })
        .exec();
    } else {
      posts = await Post.find({ community: communityName, isApproved: true })
        .sort({ date: -1 })
        .exec();
    }

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ error: "no posts found in this community" });
    }

    const postsToSort = posts.filter((post) => {
      const postTime = calculatePostTime(post);
      return postTime <= sortTime;
    });

    if (postsToSort.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    const sortedPosts = postsToSort.sort((a, b) => {
      return (
        b.upVotes.length -
        b.downVotes.length -
        (a.upVotes.length - a.downVotes.length)
      );
    });

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    const user = await User.findById(userId);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        if (post.isRemoved || post.isSpam) {
          return null;
        }
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
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
    else if (time === "day") sortTime = 24;
    else if (time === "week") sortTime = 24 * 7;
    else if (time === "month") sortTime = 24 * 30;
    else if (time === "year") sortTime = 365 * 24;

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const communities = await Community.find({
      $or: [
        { members: userId },
        { communityType: "Public" },
        { communityType: "Restricted" },
      ],
    });

    const communityName = communities.map((community) => community.name);
    const posts = await Post.find({
      community: { $in: communityName },
    }).exec();

    if (posts.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }
    const postsToSort = posts.filter((post) => {
      const postTime = calculatePostTime(post);
      return postTime <= sortTime;
    });

    if (postsToSort.length == 0) {
      return res.status(404).json({ error: "no posts found" });
    }

    const sortedPosts = postsToSort.sort((a, b) => {
      return (
        b.upVotes.length -
        b.downVotes.length -
        (a.upVotes.length - a.downVotes.length)
      );
    });

    const totalPosts = postsToSort.length;
    const totalPages = Math.ceil(totalPosts / limit);

    const paginatedPosts = sortedPosts.slice(skip, skip + limit);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
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

    const post = user.recentPosts;
    const posts = post.reverse();
    const totalPosts = posts.length;

    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const paginatedPosts = posts.slice(skip, skip + limit);

    const postInfoArray = await Promise.all(
      paginatedPosts.map(async (post) => {
        const postObject = await Post.getPostObject(post, userId);
        return postObject;
      })
    );

    const totalPages = Math.ceil(totalPosts / limit);

    const filteredPostInfoArray = postInfoArray.filter((post) => post !== null);

    res.status(200).json({
      posts: filteredPostInfoArray,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
exports.deleteRecentPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.recentPosts = [];
    await user.save();
    res
      .status(200)
      .json({ message: "All posts deleted from recent successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
