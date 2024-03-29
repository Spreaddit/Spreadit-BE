const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = require('../models/comment')

require("./user");

const PostSchema = new Schema(
  {

    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    userProfilePic: {
      type: String,
      required: true
    },
    votesUpCount: {
      type: Number,
      default: 0
    },
    votesDownCount: {
      type: Number,
      default: 0
    },
    sharesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    numberOfViews: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    community: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['post'],
      default: 'post'
    },
    pollOptions: {
      type: [String]
    },
    link: {
      type: String
    },
    imageOrVideo: {
      type: String
    },
    isSpoiler: {
      type: Boolean,
      default: false
    },
    isNsfw: {
      type: Boolean,
      default: false
    },
    sendPostReplyNotification: {
      type: Boolean,
      default: true
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model('post', PostSchema);

module.exports = Post;