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
const config = require("../src/configuration.js");

const connectionUrl = "mongodb://localhost:27017/testDBCommentsCommuntiy";

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
const id = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();
const commentId = new mongoose.Types.ObjectId();
const postId = new mongoose.Types.ObjectId();
const moderatorId = new mongoose.Types.ObjectId();

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
  userId: userTwoId,
  postId: postId,
  content: "this is the content of the comment",
  parentCommentId: null,
};
const admin = {
  _id: AdminId,
  name: "Ahmed Ashry",
  username: "Ashry",
  email: "ashry.ahmed4@gmail.com",
  password: "myPassw@ord123",
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
  subscribedCommunities: [id],
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
  await Rule.deleteMany({});
  await new Rule(rule).save();
  await Comment.deleteMany({});
  await new Comment(comment).save();
  await Moderator.deleteMany({});
  await new Moderator(moderator).save();
  await Post.deleteMany({});
  await new Post(post).save();
});

afterEach(async () => {
  await User.deleteMany({});
  await Community.deleteMany({});
  await Rule.deleteMany({});
  await Comment.deleteMany({});
  await Moderator.deleteMany({});
  await Post.deleteMany({});
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

it("should mark a comment as spam successfully", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" + communityName + "/spam-comment/" + commentId
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send();

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Comment marked as spam successfully");

  const updatedComment = await Comment.findById(commentId);
  expect(updatedComment.isSpam).toBe(true);
});

it("should return 402 if user is not a moderator", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const token = login.body.token;
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" + communityName + "/spam-comment/" + commentId
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send();

  expect(response.status).toBe(402);
  expect(response.body.message).toBe("Not a moderator");
});

it("should return 406 if moderator doesn't have permission", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const moderator = await Moderator.findOne({
    username: user.username,
    communityName: "testCommunity",
  });
  if (!moderator) {
    throw new Error("Moderator not found");
  }
  moderator.managePostsAndComments = false;
  mod = await moderator.save();
  const token = login.body.token;
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" + communityName + "/spam-comment/" + commentId
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send();

  expect(response.status).toBe(406);
  expect(response.body.message).toBe("Moderator doesn't have permission");
});

it("should return 200 and an array of spam comments", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const token = loginResponse.body.token;
  const communityName = "testCommunity";
  const spamResponse = await request(app)
    .post(
      "/community/moderation/" + communityName + "/spam-comment/" + commentId
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send()
    .expect(200);
  const response = await request(app)
    .get("/community/moderation/testCommunity/get-spam-comments")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.SpammedComments).toBeDefined();
  expect(Array.isArray(response.body.SpammedComments)).toBe(true);
});

it("should return 402 if user is not a moderator", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);

  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const token = loginResponse.body.token;

  const response = await request(app)
    .get("/community/moderation/testCommunity/get-spam-comments")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});

it("should return 500 if internal server error occurs", async () => {
  jest
    .spyOn(Moderator, "findOne")
    .mockRejectedValue(new Error("Internal server error"));

  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const response = await request(app)
    .get("/community/moderation/testCommunity/get-spam-comments")
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(500);

  expect(response.body.message).toBe("Internal server error");

  Moderator.findOne.mockRestore();
});

it("should return 200 and lock the comment", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/lock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment locked successfully");
});

it("should return 402 if user is not a moderator", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/lock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});

it("should return 200 and unlock the comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = login.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const lockResponse = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/lock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/unlock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment unlocked successfully");

  const unlockedComment = await Comment.findById(commentId);
  expect(unlockedComment.isLocked).toBe(false);
});

it("should return 402 if user is not a moderator", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const token = login.body.token;
  const communityName = "testCommunity";
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/unlock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});

it("should return 500 if internal server error occurs", async () => {
  jest
    .spyOn(Comment, "findById")
    .mockRejectedValue(new Error("Internal server error"));

  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = login.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/unlock-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(500);

  expect(response.body.error).toBe("Internal server error");

  Comment.findById.mockRestore();
});

it("should return 200 and remove the comment", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = login.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const removalReason = "This comment violates community guidelines";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/remove-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ removalReason })
    .expect(200);

  expect(response.body.message).toBe("Comment removed successfully");

  const removedComment = await Comment.findById(commentId);
  expect(removedComment.isRemoved).toBe(true);
});

it("should return 400 if removal reason is not provided", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  let removalReason;
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/remove-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ removalReason })
    .expect(400);

  expect(response.body.message).toBe("Must has a removal reason");
});

it("should return 402 if user is not a moderator", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const token = login.body.token;
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const removalReason = "This comment violates community guidelines";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/remove-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({ removalReason })
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});

it("should return 200 and approve the comment", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/approve-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.message).toBe("Comment approved successfully");
});

it("should return 402 if user is not a moderator", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .post(
      "/community/moderation/" +
        communityName +
        "/" +
        commentId +
        "/approve-comment"
    )
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});

it("should return 200 and edited comments", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }

  const loginResponse2 = await request(app)
    .post("/login")
    .send({ username: "elgarf", password: "TTFTTSTTD" })
    .expect(200);
  const user2 = await getUser("elgarf");
  if (!user2) {
    throw new Error("User not found");
  }
  const editResponse = await request(app)
    .post(`/comments/${comment._id}/edit`)
    .set("Authorization", "Bearer " + user2.tokens[0].token)
    .send({ content: "Updated comment content" })
    .expect(200);

  const communityName = "testCommunity";
  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-edited-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.editedComment.length).toBeGreaterThan(0);
});

// Test case: should return 404 if community not found
it("should return 404 if community not found", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testmeshMawgod";
  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-edited-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.error).toBe("Community not found");
});

// Test case: should return 404 if no edited comments found
it("should return 404 if no edited comments found", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-edited-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.error).toBe("Edited comments not found");
});

it("should return 200 and reported comments", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }

  const loginResponse2 = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const user2 = await getUser("abbas");
  if (!user2) {
    throw new Error("User not found");
  }
  const reportResponse = await request(app)
    .post(`/comments/${comment._id}/report`)
    .set("Authorization", "Bearer " + user2.tokens[0].token)
    .send({
      reason: "Offensive content",
      subreason: "This comment contains offensive language",
    })
    .expect(201);
  const communityName = "testCommunity";

  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-reported-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(200);

  expect(response.body.reportedComments.length).toBeGreaterThan(0);
});

// Test case: should return 404 if community not found
it("should return 404 if community not found", async () => {
  await Community.deleteMany({});
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "maher", password: "12345678" })
    .expect(200);
  const user = await getUser("maher");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-reported-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(404);

  expect(response.body.error).toBe("Community not found");
});

// Test case: should return 402 if user is not a moderator
it("should return 402 if user is not a moderator", async () => {
  const loginResponse = await request(app)
    .post("/login")
    .send({ username: "abbas", password: "12345678" })
    .expect(200);
  const token = loginResponse.body.token;
  const user = await getUser("abbas");
  if (!user) {
    throw new Error("User not found");
  }
  const communityName = "testCommunity";
  const response = await request(app)
    .get(`/community/moderation/${communityName}/get-reported-comments`)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .expect(402);

  expect(response.body.message).toBe(
    "Not a moderator or does not have permission"
  );
});
