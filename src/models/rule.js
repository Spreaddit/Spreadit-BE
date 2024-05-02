const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  reportReason: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  communityName: {
    type: String,
    trim: true,
    required: true,
  },
  appliesTo: {
    type: String,
    enum: ["posts", "comments", "both"],
    default: "both",
  },
});

const Rule = mongoose.model("rule", RuleSchema);

module.exports = Rule;
