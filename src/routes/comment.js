const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const auth = require("../middleware/authentication");
const mongoose = require("mongoose");
const upload = require("../services/fileUpload");
const { uploadMedia } = require("../services/s3");
const config = require("./../config");
const router = express.Router();


router.delete("/posts/comment/delete", auth.authentication, async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.body.id);
      if (!comment) {
        return res.status(404).send({ message: "comment not found" });
      }
  
      await Comment.deleteMany({ parentId: req.body.id });
  
      const commentObj = await Comment.getCommentObject(comment, req.user.username);
  
      res.status(200).send({
        comment: commentObj,
        message: "comment deleted successfully",
      });
    } catch {
      res.status(500).send({ message: "Internal Server Error" });
    }
});



router.get("/status/tweet/:id", auth, async (req, res) => {
    try {
      const tweet = await Tweet.findById(req.params.id).populate({
        path: "userId",
      });
  
      if (!tweet) {
        return res.status(404).send({ message: "Invalid Tweet Id" });
      }
  
      const tweetObject = await Tweet.getTweetObject(tweet, req.user.username);
      if (req.query.include_replies === "true") {
        const tweetWithReplies = await Tweet.getTweetReplies(
          tweetObject,
          req.user.username
        );
        res.status(200).send({
          tweet: tweetWithReplies,
          message: "Tweet has been retrieved successfully",
        });
      } else {
        res.status(200).send({
          tweet: tweetObject,
          message: "Tweet has been retrieved successfully",
        });
      }
    } catch (err) {
      res.status(500).send(err.toString());
    }
});