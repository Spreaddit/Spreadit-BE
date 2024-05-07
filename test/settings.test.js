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
const NotificationType = require("../seed-data/constants/notificationType.js");
const config = require("../src/configuration.js");

const connectionUrl = "mongodb://localhost:27017/testDBSettings";

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
});

//start of layout setting test

test("Test password match (layout-setting).", async () => {
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
    .put("/layout")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ enteredPassword: "12345678" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Password matches");
    });
});

test("Test password not match (layout-setting).", async () => {
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
    .put("/layout")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ enteredPassword: "123456789" })
    .expect(401)
    .then((response) => {
      expect(response.body.error).toBe("Current password is incorrect");
    });
});

test("Test userID not given (layout-setting).", async () => {
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
    .put("/layout")
    .send({ enteredPassword: "123456789" })
    .expect(401);
});

//end of layout setting test

//start of feed setting test
test("Test get feed settings.", async () => {
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
    .get("/feed")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test update feed settings success.", async () => {
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
    .put("/feed")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ adultContent: "true" })
    .expect(200);
});

test("Test userID not given (feed-setting).", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).get("/feed").send({}).expect(401);
});

//end of feed setting test

//start of profile setting test
test("Test get profile settings.", async () => {
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
    .expect(400);
});

test("Test userID not given (profile-setting).", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).get("/profile").send({}).expect(401);
});

//end of profile setting test

//start of Safety and Privacy setting test
test("Test get Safety and Privacy settings.", async () => {
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
    .get("/safety-privacy")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test update Safety and Privacy settings success.", async () => {
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
    .put("/safety-privacy")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ nsfw: "true" })
    .expect(200);
});

test("Test userID not given (SafetyandPrivacy-setting).", async () => {
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
    .get("/safety-privacy")
    .send({})
    .expect(401);
});

//end of Safety and Privacy setting test

//start of email setting test
test("Test get email settings.", async () => {
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
    .get("/email")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test update email settings success.", async () => {
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
    .put("/email")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ chatRequestEmail: "false" })
    .expect(200);
});

test("Test userID not given (email-setting).", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).get("/email").send({}).expect(401);
});

//end of email setting test

//start of account settings testing
test("Test get account settings", async () => {
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
    .get("/account")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test get account settings without id", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).get("/account").send({}).expect(401);
});

test("Test update account settings", async () => {
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
    .put("/account")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      email: "newemail@gmail.com",
      gender: "male",
      country: "Egypt",
    })
    .expect(200);
});

test("Test update account settings without id", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).put("/account").send({}).expect(401);
});

test("Test update account settings with invalid email format", async () => {
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
    .put("/account")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ email: "tyt" })
    .expect(403);
});

test("Test delete account success", async () => {
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
    .delete("/account")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test delete account without id", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).put("/account").send({}).expect(401);
});

//end of account settings testing

//start of block setting test
test("Test get block settings.", async () => {
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
    .get("/blocking-permissions")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test update block settings success.", async () => {
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
    .put("/blocking-permissions")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ allowFollow: "false" })
    .expect(200);
});

test("Test userID not given (block-setting).", async () => {
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
    .get("/blocking-permissions")
    .send({})
    .expect(401);
});

//end of block setting test

test("Test update notification settings without token", async () => {
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
    .put("/notifications")
    .send({})
    .expect(401);
});

//end of notifications setting test

//start of chat and messaging settings test

test("Test get chat and messaging settings", async () => {
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
    .get("/chat-and-messaging")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test get chat and messaging settings without token", async () => {
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
    .get("/chat-and-messaging")
    .send({})
    .expect(401);
});

//end of chat and messaging settings test

//start of contact settings test

test("Test get contact settings", async () => {
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
    .get("/contact")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
});

test("Test get contact settings without token", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "12345678" })
    .expect(200);
  const user = await User.findOne({ username: "elgarf" });
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const response = await request(app).get("/contact").send({}).expect(401);
});

test("Test update contact settings", async () => {
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
    .put("/contact")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
      inboxMessages: false,
      chatMessages: false,
      chatRequests: false,
      mentions: false,
      commentsOnYourPost: false,
      commentsYouFollow: false,
      upvotes: false,
      repliesToComments: false,
      newFollowers: false,
      cakeDay: false,
      modNotifications: false,
    })
    .expect(200);
});

//end of contact settings test
