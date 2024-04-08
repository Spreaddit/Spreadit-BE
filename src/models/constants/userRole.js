const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const UserRole = mongoose.model("userRole", userRoleSchema);
module.exports = UserRole;
