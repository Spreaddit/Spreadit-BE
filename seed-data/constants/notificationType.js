const upvoteComments = {
  _id: "6240cd218b70b6ccc7a22cdf",
  name: "Upvote Comments",
};

const commentReply = {
  _id: "6240cd3dde42068d353a2bdf",
  name: "Comment Reply",
};

const follow = {
  _id: "6240cd6b3516844208b542d4",
  name: "Follow",
};

const comment = {
  _id: "6240cd8b8b70b6ccc7a22ce0",
  name: "Comment",
};

const upvotePosts = {
  _id: "6240cddde4571e2cf49463f4",
  name: "Upvote Posts",
};

const accountUpdate = {
  _id: "6240cf6f53dab85c8756307f",
  name: "Account Update",
};

const invite = {
  _id: "6240cf6f63dab85c8756307f",
  name: "Invite",
};
const mention = {
  _id: "6240cf6f73dab85c8756307f",
  name: "mention",
};

const notificationTypes = [
  upvoteComments,
  commentReply,
  follow,
  comment,
  upvotePosts,
  accountUpdate,
  invite,
  mention,
];

exports.data = notificationTypes;
exports.upvoteComments = upvoteComments;
exports.follow = follow;
exports.commentReply = commentReply;
exports.comment = comment;
exports.upvotePosts = upvotePosts;
exports.accountUpdate = accountUpdate;
exports.invite = invite;
exports.mention = mention;
