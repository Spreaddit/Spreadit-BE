const express = require("express");
const User = require("../models/user.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const jwt = require("jwt-decode");
const router = express.Router();
const Community = require("../models/community.js");
router.use(passport.initialize());
router.use(cookieParser("spreaditsecret"));

router.get("/community/top-communities", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 250;
    const skip = (page - 1) * limit;

    const totalCommunities = await Community.countDocuments();
    const totalPages = Math.ceil(totalCommunities / limit);

    const communities = await Community.find()
      .sort({ members: -1 })
      .skip(skip)
      .limit(limit);

    if (communities.length == 0) {
      return res.status(404).json({ message: "No communities found" });
    }
    res.status(200).json({
      communities: communities,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/community/random-category", async (req, res) => {
  try {
    const communities = await Community.aggregate([{ $sample: { size: 25 } }]);

    if (communities.length == 0) {
      return res.status(404).json({ message: "No random communities found" });
    }

    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, unable to retrieve random communities",
    });
  }
});

router.post("/community/get-specific-category", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    if (!category) {
      return res.status(400).json({ message: "invalid request parameters" });
    }

    const communities = await Community.find({ category: category })
      .skip(skip)
      .limit(limit);

    const totalCommunities = await Community.countDocuments({
      category: category,
    });
    const totalPages = Math.ceil(totalCommunities / limit);

    if (communities.length == 0) {
      return res
        .status(404)
        .json({ message: "No communities found for the specified category" });
    }
    res.status(200).json({
      communities: communities,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error, unable to retrieve communities",
    });
  }
});

router.get("/community/get-info", async (req, res) => {
  try {
    const communityName = req.query.communityName;

    if (!communityName) {
      return res.status(400).json({ message: "Community name is required" });
    }

    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/community/subscribe", async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ message: "Invalid subscription request" });
    }

    const user = await User.findById(userId);
    const community = await Community.findOne({ name: name });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    if (!community) {
      return res
        .status(401)
        .json({ message: "Unauthorized, community not found" });
    }

    if (user.subscribedCommunities.includes(community._id)) {
      return res
        .status(400)
        .json({ message: "User is already subscribed to this community" });
    }

    user.subscribedCommunities.push(community._id);

    await user.save();

    res
      .status(200)
      .json({ message: "Subscribed to the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
