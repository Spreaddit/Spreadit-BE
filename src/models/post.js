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
    content: [{
      type: String,
    }],
    community: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Post', 'Images & Video', 'Link', 'Poll'],
      default: 'Post'
    },
    pollOptions: [{
      option: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }],
    pollExpiration:
    {
      type: Date, default: null
    },
    isPollEnabled: {
      type: Boolean,
      default: false
    },
    pollVotingLength: {
      type: String,
      enum: ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days'],
      default: '3 Days'
    },
    link: {
      type: String
    },
    images: [{
      type: String,
      required: false
    }],
    videos: [{
      type: String,
      required: false
    }],
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