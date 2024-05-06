const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RemovalReasonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  reasonMessage: {
    type: String,
    trim: true,
    required: true,
    maxlength: 10000,
  },
  communityName: {
    type: String,
    required: true,
    trim: true,
  },
});

const RemovalReason = mongoose.model("removalreason", RemovalReasonSchema);

module.exports = RemovalReason;
