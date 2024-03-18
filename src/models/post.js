const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./user");

const PostSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        index: true,
        ref: "user",
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "user",
      },
      content: {
        type: String,
        trim: true,
        maxLength: 280,
      },
      title: {
        type: String,
        default: null,
      },
      attachments: [
        {
          type: String,
          default: [],
        },
      ],
      gif: {
        type: String,
        default: "",
      },
      mentions: [
        {
          type: String,
          default: [],
        },
      ],
      isSpoiler: {
        type: Boolean,
        default: false,
      },
      isHidden: {
        type: Boolean,
        default: false,
      },
      isEdited: {
        type: Boolean,
        default: false,
      },
      isSpam: {
        type: Boolean,
        default: false,
      },
      isLocked: {
        type: Boolean,
        default: false,
      },
      avatar: {
        type: String,
        trim: true,
        default: "",
      },
      image: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );


  const Post = mongoose.model('post', PostSchema);

  module.exports = Post;