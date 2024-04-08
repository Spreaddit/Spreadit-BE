const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  reportReason: {
    type: String,
    trim: true,
  },
});

const Rule = mongoose.model("Rule", RuleSchema);

module.exports = Rule;
