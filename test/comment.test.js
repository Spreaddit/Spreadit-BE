const Comment = require("../src/models/comment");
const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const Report = require("../src/models/report");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule.js");
const Moderator = require("../src/models/moderator.js");
const UserRole = require("../src/models/constants/userRole.js");
const connectionUrl = "mongodb://localhost:27017/testDBComments";

beforeAll(async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
});

afterAll(() => {
  mongoose.connection.close();
});

id = new mongoose.Types.ObjectId();
id2 = new mongoose.Types.ObjectId();
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

const defaultRole = {
  _id: "6240cb40ff875b3bd3e816c7",
  name: "User",
};

const adminRole = {
  _id: "6240cb6a412efa3d5d89c0af",
  name: "Admin",
};

const rule = {
  _id: id2,
  title: "test Community Guidelines",
  description:
    "1. Respect the privacy and emotions of members when discussing mental health issues.",
  reportReason: "Violation of community guidelines",
  communityName: "testCommunity",
};
const community = {
  _id: id,
  name: "testCommunity",
  category: "Entertainment and Pop Culture",
  rules: [id2],
  description:
    "Discuss the latest movie releases, share reviews, recommendations, and indulge in lively debates about classic films.",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  communityType: "Public",
  creator: userOneId,
  members: [userOneId, userTwoId, userThreeId],
  moderators: [userOneId],
  membersCount: 3,
};
const moderator = {
  username: "maher",
  communityName: "testCommunity",
  isAccepted: true,
};
const post = {
  _id: id2,
  userId: userTwoId,
  username: "elgarf",
  title: "this is a post",
  content: "this is the content of the post",
  community: "testCommunity",
  type: "Post",
};
const comment1 = {
  _id: id,
  userId: userOneId,
  postId: id2,
  username: "maher",
  content: "I am the first comment",
};

const comment2 = {
  userId: userTwoId,
  postId: id2,
  parentId: id,
  content: "I am the second comment",
};

const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "myPassw@ord123",
  followers: [userTwoId],
  followings: [userTwoId],
  gender: "Male",
  isVerified: true,
};

const userTwo = {
  _id: userTwoId,
  name: "Amira Elgarf",
  username: "elgarf",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "elgarf@gmail.com",
  password: "TTFTTSTTD",
  followers: [userOneId],
  followings: [userOneId],
  gender: "Female",
  isVerified: true,
};

const userThree = {
  _id: userThreeId,
  name: " Mahmoud Abbas",
  username: "abbas",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "abbas@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true,
};

async function getUser(username_email) {
  const user = await User.find({
    $or: [{ email: username_email }, { username: username_email }],
  });
  if (user[0]) {
    return new User(user[0]);
  } else {
    return null;
  }
}
beforeEach(async () => {
  await User.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  await Post.deleteMany({});
  await new Post(post).save();
  await Comment.deleteMany({});
  await new Comment(comment1).save();
  await new Comment(comment2).save();
  await Community.deleteMany({});
  await new Community(community).save();
  await Rule.deleteMany({});
  await new Rule(rule).save();
  await Moderator.deleteMany({});
  await new Moderator(moderator).save();
  await UserRole.deleteMany({});
  await new UserRole(defaultRole).save();
  await new UserRole(adminRole).save();
});
afterEach(async () => {
  await User.deleteMany({});
  await Community.deleteMany({});
  await Rule.deleteMany({});
  await Comment.deleteMany({});
  await Moderator.deleteMany({});
  await Post.deleteMany({});
});

test("posting a comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "TTFTTSTTD" })
    .expect(200);

  const user = await getUser("elgarf");
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;

  const response = await request(app)
    .post("/post/comment/" + id2)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      content: "this is a new comment",
    })
    .expect(201);
});

test("missing content field", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "TTFTTSTTD" })
    .expect(200);

  const user = await getUser("elgarf");
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;

  const response = await request(app)
    .post("/post/comment/" + id2)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({})
    .expect(400);
});

test("non-existent post ID", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "TTFTTSTTD" })
    .expect(200);

  const user = await getUser("elgarf");
  if (!user) {
    throw new Error("User not found");
  }
  const nonExistentId = "661ebb4eb77c3f20e6998bf0";

  const response = await request(app)
    .post("/post/comment/" + nonExistentId)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      content: "this is a new comment",
    })
    .expect(404);
});

test("deleting user's own comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.username, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOne._id,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .delete("/posts/comment/delete/" + comment._id)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("comment deleted successfully");
});

test("deleting comment not owned by the user", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await getUser(userTwo.username);

  const comment = await Comment.create({
    userId: userOne._id,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .delete(`/posts/comment/delete/${comment._id}`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(403);

  expect(response.body.message).toBe(
    "You are not authorized to delete this comment"
  );
});

test("retrieve comments for a post", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await getUser(userTwo.username);

  // Retrieve comments for the post
  const response = await request(app)
    .get(`/posts/comment/${id2}`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  // Check response
  expect(response.body.comments.length).toBe(2); // Assuming there are two comments for this post
});

test("no comments found for a post", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await getUser(userTwo.username);

  // Retrieve comments for a non-existent post
  const response = await request(app)
    .get(`/posts/comment/${new mongoose.Types.ObjectId()}`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  // Check response
  expect(response.body.message).toBe("No comments found for the given post Id");
});

test("retrieve comments for a user", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const response = await request(app)
    .get(`/comments/user/${userOne.username}`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.comments.length).toBe(1); // Assuming userOne has one comment
});

test("no comments found for a user", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await getUser(userTwo.username);

  const response = await request(app)
    .get("/comments/user/nonExistentUser")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(500);
});

test("edit user's own comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/edit`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ content: "Updated comment content" })
    .expect(200);

  expect(response.body.message).toBe("Comment has been updated successfully");
});

test("edit comment not owned by the user", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await getUser(userTwo.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/edit`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ content: "Updated comment content" })
    .expect(403);

  expect(response.body.message).toBe(
    "You are not authorized to edit this comment"
  );
});

test("missing updated content", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/edit`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({})
    .expect(400);

  expect(response.body.message).toBe("Updated content is required");
});

test("reply to existing comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const response = await request(app)
    .post(`/comment/${comment1._id}/reply`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ content: "This is a reply to the parent comment" })
    .expect(201);

  expect(response.body.message).toBe("Reply has been added successfully");
});

test("reply to non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comment/${nonExistentId}/reply`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ content: "This is a reply to a non-existent comment" })
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});

test("missing reply content", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const parentComment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a parent comment",
  });

  const response = await request(app)
    .post(`/comment/${parentComment._id}/reply`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({})
    .expect(400);

  expect(response.body.message).toBe("Reply content is required");
});

test("get replies for existing comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const parentComment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a parent comment",
  });

  const reply = await Comment.create({
    userId: userTwoId,
    parentCommentId: parentComment._id,
    content: "This is a reply to the parent comment",
  });

  const response = await request(app)
    .get(`/comments/${parentComment._id}/replies`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe(
    "Replies for the comment have been retrieved successfully"
  );
  expect(response.body.replies.length).toBe(1);
  expect(response.body.replies[0].content).toBe(
    "This is a reply to the parent comment"
  );
});

test("hide comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/hide`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been hidden successfully");

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.hiddenBy.includes(userOneId)).toBeTruthy();
});

test("unhide comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
    hiddenBy: [userOneId],
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/hide`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been unhidden successfully");

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.hiddenBy.includes(userOneId)).toBeFalsy();
});

test("hide non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comments/${nonExistentId}/hide`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});

test("upvote comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userTwo.email, password: userTwo.password })
    .expect(200);

  const user = await User.findById(userTwo._id);
  if (!user) {
    throw new Error("User not found");
  }

  const response = await request(app)
    .post(`/comments/${comment1._id}/upvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been upvoted successfully");

  const updatedComment = await Comment.findById(comment1._id);
  expect(updatedComment.upVotes.includes(userTwoId)).toBeTruthy();
});

test("remove upvote from comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
    upVotes: [userOneId],
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/upvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(400);

  expect(response.body.message).toBe(
    "You have removed your upvote this comment"
  );

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.upVotes.includes(userOneId)).toBeFalsy();
});

test("upvote non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);
  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comments/${nonExistentId}/upvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});

test("downvote comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/downvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been downvoted successfully");

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.downVotes.includes(userOneId)).toBeTruthy();
});

test("remove downvote from comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
    downVotes: [userOneId],
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/downvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(400);

  expect(response.body.message).toBe(
    "You have removed your downvote this comment"
  );

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.downVotes.includes(userOneId)).toBeFalsy();
});

test("downvote non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comments/${nonExistentId}/downvote`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});

test("save comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/save`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been saved successfully");

  const updatedUser = await User.findById(userOneId);
  expect(updatedUser.savedComments.includes(comment._id)).toBeTruthy();

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.savedBy.includes(userOneId)).toBeTruthy();
});

test("unsave comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });
  const user1 = await User.findById(userOneId);
  user1.savedComments.push(comment._id);
  await user1.save();

  const response = await request(app)
    .post(`/comments/${comment._id}/save`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment has been unsaved successfully");

  const updatedUser = await User.findById(userOneId);
  expect(updatedUser.savedComments.includes(comment._id)).toBeFalsy();

  const updatedComment = await Comment.findById(comment._id);
  expect(updatedComment.savedBy.includes(userOneId)).toBeFalsy();
});

test("save non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comments/${nonExistentId}/save`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});

test("report comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const comment = await Comment.create({
    userId: userOneId,
    postId: id2,
    content: "This is a test comment",
  });

  const response = await request(app)
    .post(`/comments/${comment._id}/report`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      reason: "Offensive content",
      subreason: "This comment contains offensive language",
    })
    .expect(201);

  expect(response.body.message).toBe("Comment reported successfully");

  const reportedComment = await Report.findOne({ commentId: comment._id });
  expect(reportedComment).toBeTruthy();
  expect(reportedComment.reason).toBe("Offensive content");
});

test("report non-existent comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: userOne.email, password: userOne.password })
    .expect(200);

  const user = await getUser(userOne.username);

  const nonExistentId = "661ebb4eb77c3f20e6998bf0";
  const response = await request(app)
    .post(`/comments/${nonExistentId}/report`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      reason: "Spam",
      sureason: "This comment is spammy",
    })
    .expect(404);

  expect(response.body.message).toBe("Comment not found");
});
