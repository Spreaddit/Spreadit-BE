const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const auth = require("../middleware/authentication");
const mongoose = require("mongoose");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary");
const config = require("./../configuration");
const router = express.Router();



router.delete("/posts/comment/delete", auth.authentication, async (req, res) => {
    try {
      const userId = req.user._id;
      const comment = await Comment.findByIdAndDelete(req.body.id);
      if (comment.userId.toString() !== userId.toString()) {
        return res.status(403).send({ 
            message: "You are not authorized to delete this comment" 
        });
        }

      
      if (!comment) {
        return res.status(404).send({ 
            message: "comment not found" 
        });
      }
      
  
      await Comment.deleteMany({ parentId: req.body.id });
  
      const commentObj = await Comment.getCommentObject(comment, userId);
  
      res.status(200).send({
        comment: commentObj,
        message: "comment deleted successfully",
      });
    } catch {
      res.status(500).send({ 
        message: "Internal Server Error" 
        });
    }
});



router.get("/posts/comment/:postid", auth.authentication, async (req, res) => {
    try {
        const postId = req.params.postid;
        const comments = await Comment.find({postId}).populate({
        path: "userId",
        });
  
      if (!comments || comments.length === 0) {
        return res.status(404).send({ 
            message: "No comments found for the given post Id" 
        });
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
            return res.status(404).send({ 
                message: "No comments found for the user" 
            });
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

router.post("/posts/comment/:postId", auth.authentication, upload.array('attachments'), async (req, res) => {
    try {
        //verify that the post id exists in the post collections
        const postId = req.params.postId;
        const userId = req.user._id;
        console.log(userId);
        const { content } = req.body;

        console.log(userId);
        if (!content) {
            return res.status(400).send({ 
                message: "Comment content is required" 
            });
        }
        const existingPost = await Post.findById(postId);

        if (!existingPost) {
            return res.status(404).send({
                message: "Post not found"
            });
        }

        const newComment = new Comment({
            content,
            userId,
            postId,
        });

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
              const result = await uploadMedia(req.files[i]);
              //const url = `${config.baseUrl}/media/${result.Key}`;
              const url = result.secure_url;
              newComment.attachments.push(url);
            }
        }
        //console.log(newComment);
        await newComment.save();
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
        console.log(userId);
        const commentObj = await Comment.getCommentObject(newComment, userId);
        //console.log(commentObj);
        res.status(201).send({ 
            comment: commentObj,
            message: "Comment has been added successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/edit", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.userId;
        const { content } = req.body;

        if (!content) {
            return res.status(400).send({ 
                message: "Updated content is required" 
            });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        if (comment.userId !== userId) {
            return res.status(403).send({ 
                message: "You are not authorized to edit this comment" 
            });
        }

        comment.content = content;

        await comment.save();
        res.status(200).send({ 
            message: "Comment has been updated successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.get("/comments/:commentId/replies", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        const replies = await Comment.find({ parentCommentId: commentId });

        res.status(200).send({ 
            replies,
            message: "Replies for the comment have been retrieved successfully"

         });
    } catch (err) {
        // Handle errors
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:parentCommentId/reply", auth.authentication, async (req, res) => {
    try {
        const parentCommentId = req.params.parentCommentId;
        const userId = req.user.userId;
        const { content } = req.body;

        if (!content) {
            return res.status(400).send({ 
                message: "Reply content is required" 
            });
        }

        const newReply = new Comment({
            content,
            userId,
            parentCommentId,
        });

        await newReply.save();

        await Comment.findByIdAndUpdate(parentCommentId, { $inc: { repliesCount: 1 } });

        res.status(201).send({ 
            message: "Reply has been added successfully" 
        });
    } catch (err) {
        // Handle errors
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/report", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.userId;
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).send({ 
                message: "Report reason is required" 
            });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        const newReport = new Report({
            commentId,
            userId,
            reason,
        });

        await newReport.save();

        res.status(201).send({ 
            message: "Comment has been reported successfully" 
        });
    } catch (err) {

        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/save", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.userId;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }
        const user = await User.findById(userId);
        if (user.savedComments.includes(commentId)) {
            return res.status(400).send({ 
                message: "Comment is already saved" 
            });
        }
        user.savedComments.push(commentId);
        await user.save();
        res.status(200).send({ 
            message: "Comment has been saved successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/unsave", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ 
                message: "User not found" 
            });
        }

        if (!user.savedComments.includes(commentId)) {
            return res.status(400).send({ 
                message: "Comment is not saved" 
            });
        }

        user.savedComments = user.savedComments.filter(savedCommentId => savedCommentId !== commentId);
        await user.save();

        res.status(200).send({ 
            message: "Comment has been unsaved successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


module.exports = router;



