const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const auth = require("../middleware/authentication");
const mongoose = require("mongoose");
const upload = require("../service/fileUpload");
const { uploadMedia } = require("../service/cloudinary");
const config = require("./../configuration");
const Report = require("../models/report")
const router = express.Router();



router.post("/post/comment/:postId", auth.authentication, upload.array('attachments'), async (req, res) => {
    try {
        //verify that the post id exists in the post collections
        const postId = req.params.postId;
        const userId = req.user._id;
        const { content, fileType } = req.body;

        //console.log(userId);
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
              const attachmentObj = { type: fileType, link: url };
              newComment.attachments.push(attachmentObj);
            }
        }
        //console.log(newComment);
        await newComment.save();
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
        //console.log(userId);
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

router.delete("/posts/comment/delete/:commentId", auth.authentication, async (req, res) => {
    try {
      const userId = req.user._id;
      const comment = await Comment.findByIdAndDelete(req.params.commentId);
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
      
  
      await Comment.deleteMany({ parentCommentId: req.params.commentId });
  
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

router.get("/posts/comment/:postId", auth.authentication, async (req, res) => {
    try {
        const postId = req.params.postId;
        let comments;
        if (postId){
            comments = await Comment.find({postId}).populate({
                path: "userId",
            });
        } else {
            comments = await Comment.find().populate({
                path: "userId",
            });
        }
        
        //console.log("Comments:", comments);
  
      if (!comments || comments.length === 0) {
        return res.status(404).send({ 
            message: "No comments found for the given post Id" 
        });
      }

      const commentObjects =[];
      console.log(req.query.include_replies)
      for(const comment of comments){
        ///console.log(req.user._id);
        const commentObject = await Comment.getCommentObject(comment, req.user._id, true);
            if (req.query.include_replies === "true") {
                //console.log(req.user._id);
                const commentWithReplies = await Comment.getCommentReplies(commentObject, req.user._id, true);
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


router.get("/comments/user/:username", auth.authentication, async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.getUserByEmailOrUsername(username);
        const userId= user._id;
        const comments = await Comment.find({ userId }).populate({
            path: "userId",
        });

        //console.log("Comments:", comments);

        if (!comments || comments.length === 0) {
            return res.status(404).send({ 
                message: "No comments found for the user" 
            });
        }

        const commentObjects = [];
        for (const comment of comments) {
            const commentObject = await Comment.getCommentObject(comment, req.user._id);
            console.log(commentObject);
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

router.get("/comments/saved/user", auth.authentication, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('savedComments');

        if (!user) {
            return res.status(404).send({ 
                message: "User not found" 
            });
        }

        const savedComments = user.savedComments;
        if (!savedComments || savedComments.length === 0) {
            return res.status(404).send({ 
                message: "No saved comments found for the user" 
            });
        }

        const commentObjects = [];
        for (const comment of savedComments) {
            const commentObject = await Comment.getCommentObject(comment,  req.user._id, true);
            if (req.query.include_replies === "true") {
                const commentWithReplies = await Comment.getCommentReplies(commentObject, req.user.username);
                commentObject.replies = commentWithReplies.replies;
            }
            commentObjects.push(commentObject);
        }

        res.status(200).send({
            comments: commentObjects,
            message: "Saved Comments for the user have been retrieved successfully",
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/edit", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
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

        if (comment.userId.toString() !== userId.toString()) {
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


router.post("/comment/:parentCommentId/reply", auth.authentication, upload.array('attachments'), async (req, res) => {
    try {
        const parentCommentId = req.params.parentCommentId;
        //const postId = req.params.postId;
        const userId = req.user._id;
        const { content, fileType } = req.body;
        if (!content) {
            return res.status(400).send({ 
                message: "Reply content is required" 
            });
        }

        const existingComment = await Comment.findById(parentCommentId);

        if (!existingComment) {
            return res.status(404).send({
                message: "Comment not found"
            });
        }

        const newReply = new Comment({
            content,
            userId,
            parentCommentId,
        });

        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
              const result = await uploadMedia(req.files[i]);
              //const url = `${config.baseUrl}/media/${result.Key}`;
              const url = result.secure_url;
              const attachmentObj = { type: fileType, link: url };
              newReply.attachments.push(attachmentObj);
            }
        }

        await newReply.save();

        await Comment.findByIdAndUpdate(parentCommentId, { $inc: { repliesCount: 1 } });
        const replyObj = await Comment.getCommentObject(newReply, userId);

        res.status(201).send({ 
            reply: replyObj,
            message: "Reply has been added successfully" 
        });
    } catch (err) {
        // Handle errors
        res.status(500).send(err.toString());
    }
});


router.get("/comments/:commentId/replies", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        const replies = await Comment.getCommentReplies(comment, userId);

        res.status(200).send({ 
            replies,
            message: "Replies for the comment have been retrieved successfully"

         });
    } catch (err) {
        // Handle errors
        res.status(500).send(err.toString());
    }
});

router.post("/comments/:commentId/hide", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        const isHidden = comment.hiddenBy.includes(userId);
        if (isHidden) {
            // If already hidden, remove from hiddenBy array
            const index = comment.hiddenBy.indexOf(userId);
            if (index > -1) {
                comment.hiddenBy.splice(index, 1);
            }
        } else {
            // If not hidden, add to hiddenBy array
            comment.hiddenBy.push(userId);
        }

        await comment.save();

        // Update the user's hiddenComments array
        const user = await User.findById(userId);
        if (user) {
            const hiddenCommentsIndex = user.hiddenComments.indexOf(commentId);
            if (isHidden && hiddenCommentsIndex > -1) {
                // If comment was hidden and is now unhidden, remove from hiddenComments
                user.hiddenComments.splice(hiddenCommentsIndex, 1);
            } else if (!isHidden && hiddenCommentsIndex === -1) {
                // If comment was unhidden and is now hidden, add to hiddenComments
                user.hiddenComments.push(commentId);
            }
            await user.save();
        }

        res.status(200).send({ message: `Comment has been ${isHidden ? 'unhidden' : 'hidden'} successfully` });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/upvote", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }
        const downvotesCount = comment.downVotes.length;
        const upvotesCount = comment.upVotes.length;
        let netVotes = upvotesCount - downvotesCount;
        //console.log(netVotes)

        const downvoteIndex = comment.downVotes.indexOf(userId);
        if (downvoteIndex !== -1) {
            comment.downVotes.splice(downvoteIndex, 1);
            netVotes = netVotes - 1;
            //console.log(netVotes)
        }
        
        if (comment.upVotes.includes(userId)) {
            const upvoteIndex = comment.upVotes.indexOf(userId);
            if (upvoteIndex !== -1) {
                comment.upVotes.splice(upvoteIndex, 1);
                await comment.save();
            }
            netVotes = netVotes - 1;
            //console.log(netVotes)
            return res.status(400).send({ 
                votes: netVotes,
                message: "You have removed your upvote this comment" 
            });
        }

        comment.upVotes.push(userId);
        await comment.save();
        
        netVotes = netVotes + 1;
        //console.log(netVotes)

        res.status(200).send({ 
            votes: netVotes,
            message: "Comment has been upvoted successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});


router.post("/comments/:commentId/downvote", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }
        const downvotesCount = comment.downVotes.length;
        const upvotesCount = comment.upVotes.length;
        let netVotes = upvotesCount - downvotesCount;
        //console.log(netVotes)

        const upvoteIndex = comment.upVotes.indexOf(userId);
        if (upvoteIndex !== -1) {
            comment.upVotes.splice(upvoteIndex, 1);
            netVotes = netVotes - 1;
            //console.log(netVotes)
        }
        
        if (comment.downVotes.includes(userId)) {
            const downvoteIndex = comment.downVotes.indexOf(userId);
            if (downvoteIndex !== -1) {
                comment.downVotes.splice(downvoteIndex, 1);
                await comment.save(); 
            }
            netVotes = netVotes + 1;
            //console.log(netVotes)
            return res.status(400).send({ 
                votes: netVotes,
                message: "You have removed your downvote this comment" 
            });
        }

        netVotes = netVotes - 1;
        //console.log(netVotes)

        comment.downVotes.push(userId);
        await comment.save();

        res.status(200).send({ 
            votes: netVotes,
            message: "Comment has been downvoted successfully" 
        });
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

router.post("/comments/:commentId/save", auth.authentication, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ 
                message: "User not found" 
            });
        }
        if (user.savedComments.includes(commentId)) {
            const index = user.savedComments.indexOf(commentId);
            user.savedComments.splice(index, 1);
            await user.save();
            return res.status(200).send({ 
                message: "Comment has been unsaved successfully" 
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

router.post("/comments/:commentId/report", auth.authentication, async (req, res) => {
    try {
        const { commentId } = req.params;
        const { reason, sureason } = req.body;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ 
                message: "Comment not found" 
            });
        }

        const report = new Report({
            userId: userId,
            postId: comment.postId,
            commentId: commentId,
            reason: reason,
            sureason: sureason
        });

        await report.save();

        res.status(201).send({ 
            message: "Comment reported successfully" 
        });
    } catch (error) {
        console.error("Error reporting comment:", error);
        res.status(500).send({ 
            error: "An error occurred while reporting the comment" 
        });
    }
});


//shring a comment ??

module.exports = router;



