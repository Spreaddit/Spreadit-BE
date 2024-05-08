const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const Post = require("../src/models/post.js");
const Comment = require("../src/models/comment.js");
const User = require("../src/models/user.js");
const Report = require("../src/models/report.js");
const Community = require("../src/models/community.js");
const Moderator = require("../src/models/moderator.js");
const userRole = require("../seed-data/constants/userRole.js");
const Rule = require("../src/models/rule.js");
const UserRole = require("../src/models/constants/userRole.js");
const Notification = require("../src/models/notification.js");
const Search = require("../src/models/SearchLog.js");
const NotificationType = require("../seed-data/constants/notificationType.js");
const config = require("../src/configuration.js");
const SearchLog = require("../src/models/SearchLog.js");

const connectionUrl = "mongodb://localhost:27017/testDBSearch";

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

const AdminId = "6240cb6a412efa3d5d89c0af";
const admind = new mongoose.Types.ObjectId();
const id = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();
const commentId = new mongoose.Types.ObjectId();
const commentTwoId = new mongoose.Types.ObjectId();
const postId = new mongoose.Types.ObjectId();
const moderatorId = new mongoose.Types.ObjectId();
const notificationId = new mongoose.Types.ObjectId();
const communityId = new mongoose.Types.ObjectId();
const ruleId = new mongoose.Types.ObjectId();
const searchId = new mongoose.Types.ObjectId();

const search1 = {
  _id: searchId,
  query: "test",
  type: "normal",
  communityId: null,
  userId: null,
  searchedByUserId: userTwoId,
  isInProfile: false,
};

const search2 = {
  query: "test2",
  type: "normal",
  communityId: null,
  userId: null,
  searchedByUserId: userOneId,
  isInProfile: false,
};

const notification1 = {
  _id: notificationId,
  userId: userTwoId,
  content: "maher replied on your comment",
  relatedUserId: userOneId,
  notificationTypeId: NotificationType.commentReply._id,
  commentId: commentTwoId,
};

const notification2 = {
  userId: userTwoId,
  content: "abbas commented your post",
  relatedUserId: userThreeId,
  notificationTypeId: NotificationType.comment._id,
  postId: postId,
  commentId: commentId,
};
const defaultRole = {
  _id: "6240cb40ff875b3bd3e816c7",
  name: "User",
};

const adminRole = {
  _id: "6240cb6a412efa3d5d89c0af",
  name: "Admin",
};

const post = {
  _id: postId,
  userId: userTwoId,
  username: "elgarf",
  title: "this is a post",
  content: "this is the content of the post",
  community: "testCommunity",
  type: "Post",
};
const comment = {
  _id: commentId,
  userId: userThreeId,
  postId: postId,
  content: "this is the content of the comment",
  parentCommentId: null,
};

const comment2 = {
  _id: commentTwoId,
  userId: userOneId,
  content: "this is a reply to the comment",
  parentCommentId: commentId,
};
const admin = {
  _id: admind,
  name: "Ahmed Ashry",
  username: "ashry",
  email: "ashry.ahmed4@gmail.com",
  password: "123456789",
  gender: "Male",
  roleId: userRole.adminRole._id,
  isVerified: true,
};
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "12345678",
  followers: [userTwoId],
  followings: [userTwoId],
  gender: "Male",
  isVerified: true,
  roleId: userRole.defaultRole._id,
  subscribedCommunities: [id],
  isBanned: true,
};
const userTwo = {
  _id: userTwoId,
  name: "Amira Elgarf",
  username: "elgarf",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "elgarf@gmail.com",
  password: "12345678",
  followers: [userOneId],
  followings: [userOneId],
  gender: "Female",
  isVerified: true,
  roleId: userRole.defaultRole._id,
  subscribedCommunities: [id],
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
  roleId: userRole.defaultRole._id,
  subscribedCommunities: [id],
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
const rule2 = {
  _id: ruleId,
  title: "test2 Community Guidelines",
  description:
    "1. Respect the privacy and emotions of members when discussing mental health issues.",
  reportReason: "Violation of community guidelines",
  communityName: "testCommunity2",
};
const community2 = {
  _id: communityId,
  name: "testCommunity2",
  category: "Entertainment and Pop Culture",
  rules: [id2],
  description:
    "Discuss the latest movie releases, share reviews, recommendations, and indulge in lively debates about classic films.",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  communityType: "Public",
  creator: userTwoId,
  members: [userOneId, userTwoId, userThreeId],
  moderators: [userTwoId],
  membersCount: 3,
};
const moderator = {
  username: "maher",
  communityName: "testCommunity",
  isAccepted: true,
};

beforeEach(async () => {
  await User.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  await new User(admin).save();
  await Community.deleteMany({});
  await new Community(community).save();
  await new Community(community2).save();
  await Rule.deleteMany({});
  await new Rule(rule).save();
  await new Rule(rule2).save();
  await Comment.deleteMany({});
  await new Comment(comment).save();
  await new Comment(comment2).save();
  await Moderator.deleteMany({});
  await new Moderator(moderator).save();
  await Post.deleteMany({});
  await new Post(post).save();
  await UserRole.deleteMany({});
  await new UserRole(defaultRole).save();
  await new UserRole(adminRole).save();
  await Notification.deleteMany({});
  await new Notification(notification1).save();
  await new Notification(notification2).save();
  await new SearchLog(search1).save();
  await new SearchLog(search2).save();
});
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

afterEach(async () => {
  await User.deleteMany({});
  await Community.deleteMany({});
  await Rule.deleteMany({});
  await Comment.deleteMany({});
  await Moderator.deleteMany({});
  await Post.deleteMany({});
  await UserRole.deleteMany({});
  await Notification.deleteMany({});
  await SearchLog.deleteMany({});
});

it("should get history of serach", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/history")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send();

  expect(response.status).toBe(200);
});

it("should search for people", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "people" });

  expect(response.status).toBe(200);
});

it("should search for posts", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "posts" });

  expect(response.status).toBe(200);
});

it("should search for comments", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "comments" });

  expect(response.status).toBe(200);
});

it("should search for communities", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "communities" });

  expect(response.status).toBe(200);
});

it("should return 400 if no q sent", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ type: "communities" });

  expect(response.status).toBe(400);
});

it("should return 400 if no type send", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt" });

  expect(response.status).toBe(400);
});

it("should return 400 if fault type", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "test" });

  expect(response.status).toBe(400);
});

it("should log search", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .post("/log")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ query: "testtt", type: "normal" });

  expect(response.status).toBe(200);
});

it("should return 400 if no query", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .post("/log")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ type: "normal" });

  expect(response.status).toBe(400);
});

it("should return 400 if no type", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .post("/log")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ query: "testtt" });

  expect(response.status).toBe(400);
});

it("should get trending posts", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/trending")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send();

  expect(response.status).toBe(200);
});

it("should search for posts in profile", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/profile")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "posts", username: "elgarf" });

  expect(response.status).toBe(200);
});

it("should search for comments in profile", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/profile")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt", type: "comments", username: "elgarf" });

  expect(response.status).toBe(200);
});

it("should search for comments in profile and return 400 if any of q or type not found", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/profile")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt" });

  expect(response.status).toBe(400);
});

it("should get search suggestion", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/suggestions")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .query({ q: "testtt" });

  expect(response.status).toBe(200);
});

it("should return 400 if no q", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app)
    .get("/suggestions")
    .set("Authorization", "Bearer " + user.tokens[0].token);

  expect(response.status).toBe(400);
});
