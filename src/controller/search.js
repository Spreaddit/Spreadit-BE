const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const mongoose = require("mongoose");
const listingController = require("../controller/listing-controller");
const SearchLog = require("../models/SearchLog.js");

const jwt = require("jsonwebtoken");

const calculateTrendingScore = (post) => {
  const weightViews = 0.3;
  const weightComments = 0.4;
  const weightUpvotes = 0.3;

  const ageInHours = (Date.now() - post.date.getTime()) / (1000 * 3600);

  const engagementMetric =
    post.numberOfViews * weightViews +
    post.commentsCount * weightComments +
    post.upVotes.length * weightUpvotes;
  const trendingScore = engagementMetric / Math.log10(ageInHours + 2);

  return trendingScore;
};

const getTopTrendingPosts = async (posts) => {
  const postsWithScores = posts.map((post) => ({
    ...post.toObject(),
    trendingScore: calculateTrendingScore(post),
  }));

  const sortedPosts = postsWithScores.sort(
    (a, b) => b.trendingScore - a.trendingScore
  );

  return sortedPosts.slice(0, 5);
};

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

const sortPostHot = async (posts) => {
  const postsWithScores = posts.map((post) => ({
    ...post.toObject(),
    hotnessScore: calculateHotnessScore(post),
  }));
  return postsWithScores.sort((a, b) => b.hotnessScore - a.hotnessScore);
};

const sortPostNew = async (posts) => {
  return posts.sort((a, b) => b.date - a.date);
};

const sortPostTop = async (posts) => {
  return posts.sort((a, b) => {
    return (
      b.upVotes.length -
      b.downVotes.length -
      (a.upVotes.length - a.downVotes.length)
    );
  });
};

const sortPostComment = async (posts) => {
  return posts.sort((a, b) => b.commentsCount - a.commentsCount);
};

const sortCommentsNew = async (comments) => {
  return comments.sort((a, b) => b.timestamps - a.timestamps);
};

const sortCommentsTop = async (comments) => {
  return comments.sort((a, b) => {
    return (
      b.upVotes.length -
      b.downVotes.length -
      (a.upVotes.length - a.downVotes.length)
    );
  });
};

const filterUsers = (users, query) => {
  const exactMatch = [];
  const startsWithQuery = [];
  const containsQuery = [];
  users.forEach((user) => {
    if (user.username.toLowerCase() === query.toLowerCase()) {
      exactMatch.push(user);
    } else if (user.username.toLowerCase().startsWith(query.toLowerCase())) {
      startsWithQuery.push(user);
    } else {
      containsQuery.push(user);
    }
  });

  return [...exactMatch, ...startsWithQuery, ...containsQuery];
};

const filterPosts = (posts, query) => {
  const exactMatch = [];
  const startsWith = [];
  const contains = [];

  posts.forEach((post) => {
    post.numberOfViews++;
    post.save();
    if (post.title.toLowerCase() === query.toLowerCase()) {
      exactMatch.push(post);
    } else if (post.title.toLowerCase().startsWith(query.toLowerCase())) {
      startsWith.push(post);
    } else {
      contains.push(post);
    }
  });
  const sortedPosts = exactMatch.concat(startsWith).concat(contains);

  return sortedPosts;
};

const filterComments = (comments, query) => {
  const exactMatch = [];
  const startsWith = [];
  const contains = [];

  comments.forEach((comment) => {
    if (comment.content.toLowerCase() === query.toLowerCase()) {
      exactMatch.push(comment);
    } else if (comment.content.toLowerCase().startsWith(query.toLowerCase())) {
      startsWith.push(comment);
    } else {
      contains.push(comment);
    }
  });

  const sortedComments = exactMatch.concat(startsWith).concat(contains);

  return sortedComments;
};

const filterCommunities = (communities, query) => {
  const exactMatch = [];
  const startsWith = [];
  const contains = [];

  communities.forEach((community) => {
    if (community.name.toLowerCase() === query.toLowerCase()) {
      exactMatch.push(community);
    } else if (community.name.toLowerCase().startsWith(query.toLowerCase())) {
      startsWith.push(community);
    } else {
      contains.push(community);
    }
  });
  const sortedCommunities = exactMatch.concat(startsWith).concat(contains);

  return sortedCommunities;
};

exports.getSearch = async (req, res) => {
  try {
    const { q, type, sort } = req.query;
    if (!q || !type) {
      return res.status(400).json({ error: "Invalid search query or type" });
    }
    if (type === "people") {
      const users = await User.find({
        $or: [
          { username: q },
          { username: { $regex: `^${q}`, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
      });

      const sortedUsers = filterUsers(users, q);
      const simplifiedUsers = await Promise.all(
        sortedUsers.map((user) =>
          User.getUserObjectSimplified(user, req.user.id)
        )
      );

      return res.status(200).json({ results: simplifiedUsers });
    } else if (type === "posts") {
      let posts = await Post.find({ title: { $regex: q, $options: "i" } });
      const sortedPosts = filterPosts(posts, q);
      if (sort === "hot") {
        posts = await sortPostHot(sortedPosts);
      } else if (sort === "new") {
        posts = await sortPostNew(sortedPosts);
      } else if (sort === "top") {
        posts = await sortPostTop(sortedPosts);
      } else if (sort === "comment") {
        posts = await sortPostComment(sortedPosts);
      } else {
        posts = sortedPosts;
      }
      await Promise.all(
        posts.map(async (post) => {
          await Post.updateOne(
            { _id: post._id },
            { $inc: { numberOfViews: 1 } }
          );
        })
      );
      const postResults = await Promise.all(
        posts.map((post) => Post.getPostResultObject(post, req.user._id))
      );

      return res.status(200).json({ results: postResults });
    } else if (type === "comments") {
      let comments = await Comment.find({
        content: { $regex: q, $options: "i" },
      });
      const sortedComments = filterComments(comments, q);
      if (sort === "new") {
        comments = await sortCommentsNew(sortedComments);
      } else if (sort === "top") {
        comments = await sortCommentsTop(sortedComments);
      } else {
        comments = sortedComments;
      }
      const commentObjects = await Promise.all(
        comments.map(async (comment) => {
          return await Comment.getCommentInfoSimplified(comment);
        })
      );
      return res.status(200).json({ results: commentObjects });
    } else if (type === "communities") {
      const communities = await Community.find({
        name: { $regex: q, $options: "i" },
      });
      const sortedCommunities = filterCommunities(communities, q);
      const communityResults = await Promise.all(
        sortedCommunities.map((community) =>
          Community.getCommunityObjectFiltered(community)
        )
      );
      return res.status(200).json({ results: communityResults });
    } else {
      return res.status(400).json({ error: "Invalid search type" });
    }
  } catch (err) {
    console.error("Error occurred during search:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProfileSearch = async (req, res) => {
  try {
    const { username, communityname, q, type, sort } = req.query;
    let query = {};
    if (username) {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      query = { userId: user._id };
    } else if (communityname) {
      query = { community: communityname };
    } else {
      return res.status(400).json({
        error:
          "Invalid search: You must provide either username or communityname",
      });
    }

    if (!q || !type) {
      return res.status(400).json({ error: "Invalid search query or type" });
    }
    if (type === "posts") {
      let posts = await Post.find({
        ...query,
        title: { $regex: q, $options: "i" },
      });
      const sortedPosts = filterPosts(posts, q);
      if (sort === "hot") {
        posts = await sortPostHot(sortedPosts);
      } else if (sort === "new") {
        posts = await sortPostNew(sortedPosts);
      } else if (sort === "top") {
        posts = await sortPostTop(sortedPosts);
      } else if (sort === "comment") {
        posts = await sortPostComment(sortedPosts);
      } else {
        posts = sortedPosts;
      }
      await Promise.all(
        posts.map(async (post) => {
          await Post.updateOne(
            { _id: post._id },
            { $inc: { numberOfViews: 1 } }
          );
        })
      );
      const postResults = await Promise.all(
        posts.map((post) => Post.getPostResultObject(post, req.user._id))
      );

      return res.status(200).json({ results: postResults });
    } else if (type === "comments") {
      let comments = await Comment.find({
        ...query,
        content: { $regex: q, $options: "i" },
      });
      const sortedComments = filterComments(comments, q);
      if (sort === "new") {
        comments = await sortCommentsNew(sortedComments);
      } else if (sort === "top") {
        comments = await sortCommentsTop(sortedComments);
      } else {
        comments = sortedComments;
      }
      const commentObjects = await Promise.all(
        comments.map(async (comment) => {
          return await Comment.getCommentInfoSimplified(comment);
        })
      );

      return res.status(200).json({ results: commentObjects });
    } else {
      return res.status(400).json({ error: "Invalid search type" });
    }
  } catch (err) {
    console.error("Error occurred during search:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Invalid search query" });
    }

    const exactUserMatch = await User.find({ username: q });

    const exactCommunityMatch = await Community.find({ name: q });

    const startsWithUser = await User.find({
      username: { $regex: `^${q}`, $options: "i" },
    });
    const startsWithCommunity = await Community.find({
      name: { $regex: `^${q}`, $options: "i" },
    });

    const containsUser = await User.find({
      username: { $regex: q, $options: "i" },
    });
    const containsCommunity = await Community.find({
      name: { $regex: q, $options: "i" },
    });

    const users = [
      ...exactUserMatch,
      ...startsWithUser.filter(
        (user) => !exactUserMatch.find((u) => u._id.equals(user._id))
      ),
      ...containsUser.filter(
        (user) => !startsWithUser.find((u) => u._id.equals(user._id))
      ),
    ];

    const communities = [
      ...exactCommunityMatch,
      ...startsWithCommunity.filter(
        (community) =>
          !exactCommunityMatch.find((c) => c._id.equals(community._id))
      ),
      ...containsCommunity.filter(
        (community) =>
          !startsWithCommunity.find((c) => c._id.equals(community._id))
      ),
    ];

    const suggestedUsers = users.slice(0, 5);
    const userResults = await Promise.all(
      suggestedUsers.map((user) => User.getUserObjectSimplified(user))
    );

    const suggestedCommunities = communities.slice(0, 5);
    const communityResults = await Promise.all(
      suggestedCommunities.map((community) =>
        Community.getCommunityObjectFiltered(community)
      )
    );

    return res.status(200).json({
      communities: communityResults,
      users: userResults,
    });
  } catch (err) {
    console.error("Error occurred while retrieving search suggestions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTrendingPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();

    const postsWithAttachments = allPosts.filter(
      (post) => post.attachments && post.attachments.length > 0
    );
    const sortedPosts = postsWithAttachments.sort(
      (a, b) => b.commentsCount - a.commentsCount
    );

    const topTrendingPosts = sortedPosts.slice(0, 5);
    await Promise.all(
      topTrendingPosts.map(async (post) => {
        await Post.updateOne({ _id: post._id }, { $inc: { numberOfViews: 1 } });
      })
    );
    const postResults = await Promise.all(
      topTrendingPosts.map((post) => Post.getPostResultObject(post, req.user._id))
    );

    return res.status(200).json({ results: postResults });
  } catch (err) {
    console.error("Error occurred while getting trending posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logSearchActivity = async (req, res) => {
  try {
    const { query, type, communityName, username, isInProfile } = req.body;

    if (!query || !type || !["normal", "community", "user"].includes(type)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const communityId = await Community.findOne({ name: communityName });
    const searchedByUser = await User.findOne({ username });

    if (type === "community" && !communityId) {
      return res
        .status(400)
        .json({ error: "Community name is required for community search" });
    } else if (type === "user" && !searchedByUser) {
      return res
        .status(400)
        .json({ error: "Username is required for user search" });
    }

    let existingSearchLogs = await SearchLog.find({
      searchedByUserId: req.user._id,
    });

    if (existingSearchLogs.length >= 5) {
      const oldestSearchLog = existingSearchLogs.sort(
        (a, b) => a.createdAt - b.createdAt
      )[0];
      await oldestSearchLog.deleteOne();
    }

    const searchQuery = { query, type };
    if (req.user) {
      searchQuery.searchedByUserId = req.user._id;
    }

    let existingSearchLog = await SearchLog.findOne(searchQuery);

    if (existingSearchLog) {
      if (existingSearchLog.searchedByUserId.equals(req.user._id)) {
        existingSearchLog.communityId =
          type === "community" ? communityId : null;
        existingSearchLog.userId = type === "user" ? searchedByUser._id : null;
        existingSearchLog.isInProfile = Boolean(isInProfile);
        existingSearchLog.updatedAt = Date.now();
        await existingSearchLog.save();
      } else {
        const newSearchLog = new SearchLog({
          query,
          type,
          communityId: type === "community" ? communityId : null,
          userId: type === "user" ? searchedByUser._id : null,
          searchedByUserId: req.user._id,
          isInProfile: Boolean(isInProfile),
        });
        await newSearchLog.save();
      }
    } else {
      const newSearchLog = new SearchLog({
        query,
        type,
        communityId: type === "community" ? communityId : null,
        userId: type === "user" ? searchedByUser._id : null,
        searchedByUserId: req.user ? req.user._id : null,
        isInProfile: Boolean(isInProfile),
      });
      await newSearchLog.save();
    }

    return res
      .status(200)
      .json({ message: "Search activity logged successfully" });
  } catch (err) {
    console.error("Error occurred while logging search activity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const searchHistory = await SearchLog.find({
      searchedByUserId: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate("communityId", "name image")
      .populate("userId", "username avatar");

    const formattedHistory = searchHistory.map((history) => ({
      query: history.query,
      type: history.type,
      communityId: history.communityId
        ? history.communityId._id.toString()
        : null,
      communityName: history.communityId ? history.communityId.name : null,
      communityProfilePic: history.communityId
        ? history.communityId.image
        : null,
      userId: history.userId ? history.userId._id.toString() : null,
      userName: history.userId ? history.userId.username : null,
      userProfilePic: history.userId ? history.userId.avatar : null,
      isInProfile: history.isInProfile,
    }));

    return res.status(200).json(formattedHistory);
  } catch (err) {
    console.error("Error occurred while retrieving search history:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSearchHistory = async (req, res) => {
  try {
    const query = req.query.query;
    const userId = req.user._id;

    const deletedSearchLog = await SearchLog.findOneAndDelete({
      query,
      searchedByUserId: userId,
    });

    if (!deletedSearchLog) {
      return res.status(404).json({ error: "Search history record not found" });
    }

    return res
      .status(200)
      .json({ message: "Search history record deleted successfully" });
  } catch (err) {
    console.error("Error occurred while deleting search history record:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
