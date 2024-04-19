const defaultRole = {
  _id: "6240cb40ff875b3bd3e816c7",
  name: "User",
};

const adminRole = {
  _id: "6240cb6a412efa3d5d89c0af",
  name: "Admin",
};

const roles = [defaultRole, adminRole];

exports.data = roles;
exports.defaultRole = defaultRole;
exports.adminRole = adminRole;
