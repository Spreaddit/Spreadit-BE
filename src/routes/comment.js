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



router.get("/posts/comment/:postid", auth.authentication, async (req, res) => {
    try {
        const postId = req.params.postid;
        const comments = await Comment.find({postId}).populate({
        path: "userId",
        });
  
      if (!comments || comments.length === 0) {
        return res.status(404).send({ message: "No comments found for the given post Id" });
      }

      const commentObjects =[];
      for(const comment of comments){
        const commentObject = await Comment.getCommentObject(comment, req.user.username);
            if (req.query.include_replies === "true") {
                const commentWithReplies = await Comment.getCommentReplies(commentObject, req.user.username);
                commentObject.replies = commentWithReplies.replies;
            }
        commentObjects.push(commentObject);
      }
      res.status(200).send({
        comments: commentObjects,
        message: "Comments have been retrieved successfully",
        });

    } catch (err) {
      res.status(500).send(err.toString());
    }
});


router.get("/comments/user", auth.authentication, async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const comments = await Comment.find({ userId }).populate({
            path: "userId",
        });

        if (!comments || comments.length === 0) {
            return res.status(404).send({ message: "No comments found for the user" });
        }

        const commentObjects = [];
        for (const comment of comments) {
            const commentObject = await Comment.getCommentObject(comment, req.user.username);
            if (req.query.include_replies === "true") {
                const commentWithReplies = await Comment.getCommentReplies(commentObject, req.user.username);
                commentObject.replies = commentWithReplies.replies;
            }
            commentObjects.push(commentObject);
        }

        res.status(200).send({
            comments: commentObjects,
            message: "Comments for the user have been retrieved successfully",
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});
