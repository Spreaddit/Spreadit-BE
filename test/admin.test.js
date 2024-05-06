const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const Post = require("../src/models/post.js");
const Comment = require("../src/models/comment.js");
const User = require("../src/models/user.js");
const Report = require("../src/models/report.js");
const Community = require("../src/models/community.js");
const Moderator = require("../src/models/moderator.js");
const Ban = require("../src/models/banUser.js");
const userRole = require("../seed-data/constants/userRole.js");
const Rule = require("../src/models/rule.js");
const UserRole = require("../src/models/constants/userRole.js");
const config = require("../src/configuration.js");

const connectionUrl = "mongodb://localhost:27017/testDBAdmin";

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
const postId = new mongoose.Types.ObjectId();
const moderatorId = new mongoose.Types.ObjectId();

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
  userId: userTwoId,
  postId: postId,
  content: "this is the content of the comment",
  parentCommentId: null,
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
  password: "TTFTTSTTD",
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
const moderator = {
  username: "maher",
  communityName: "testCommunity",
  isAccepted: true,
};
const ban = {
  userId: userOneId,
  reason: "bad behaviour",
  isPermanent: true,
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
  await UserRole.deleteMany({});
  await new UserRole(defaultRole).save();
  await new UserRole(adminRole).save();
  await Ban.deleteMany({});
  await new Ban(ban).save();
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

describe("POST /dashboard/ban", () => {
  // Test case: should ban a user permanently
  it("should ban a user permanently", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await getUser("ashry");
    if (!user || !user.tokens || !user.tokens[0] || !user.tokens[0].token) {
      throw new Error("User or user tokens not found");
    }

    const user2 = await getUser("elgarf");
    if (!user2) {
      throw new Error("User to be banned mesh mawgod");
    }
    const response = await request(app)
      .post("/dashboard/ban")
      .send({
        username: "elgarf",
        reason: "banReason",
        isPermanent: true,
      })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

    expect(response.body.message).toBe("User Banned successfully");
  });

  // Test case: should ban a user temporarily
  it("should ban a user temporarily", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await getUser("ashry");
    if (!user || !user.tokens || !user.tokens[0] || !user.tokens[0].token) {
      throw new Error("User or user tokens not found");
    }
    const response = await request(app)
      .post("/dashboard/ban")
      .send({
        username: "elgarf",
        reason: "banReason",
        isPermanent: false,
        banDuration: "2025-01-01T00:00:00.000Z",
      })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

    expect(response.body.message).toBe("User Banned successfully");
  });

  // Test case: should return 402 if the user is already banned
  it("should return 402 if the user is already banned", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await getUser("ashry");
    if (!user || !user.tokens || !user.tokens[0] || !user.tokens[0].token) {
      throw new Error("User or user tokens not found");
    }
    const response = await request(app)
      .post("/dashboard/ban")
      .send({
        username: "maher",
        reason: "banReason",
        isPermanent: true,
      })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(402);

    expect(response.body.message).toBe("the user is already banned");
  });

  // Test case: should return 401 if user is not authorized
  it("should return 401 if user is not authorized", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "abbas", password: "12345678" })
      .expect(200);
    const user = await getUser("abbas");
    if (!user || !user.tokens || !user.tokens[0] || !user.tokens[0].token) {
      throw new Error("User or user tokens not found");
    }
    const response = await request(app)
      .post("/dashboard/ban")
      .send({
        username: "elgarf",
        reason: "banReason",
        isPermanent: true,
      })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(401);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("You are not authorized");
  });
});

describe("POST /dashboard/unban", () => {
  // Test case: should unban a user

  it("should unban a user", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await User.findOne({ username: "ashry" });

    const response = await request(app)
      .post("/dashboard/unban")
      .send({ username: "maher" })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

    expect(response.body.message).toBe("User was unbanned successfully");
    expect(response.body.user.isBanned).toBe(false);
  });

  // Test case: should return 404 if user is not found
  it("should return 404 if user is not found", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await User.findOne({ username: "ashry" });

    const response = await request(app)
      .post("/dashboard/unban")
      .send({ username: "notfounduser" })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(404);
    expect(response.body.message).toBe("User is not found");
  });

  // Test case: should return 404 if user is not banned
  it("should return 404 if user is not banned", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await User.findOne({ username: "ashry" });
    const response = await request(app)
      .post("/dashboard/unban")
      .send({ username: "abbas" })
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(404);

    expect(response.body.message).toBe("User is not banned");
  });
});

describe("GET /dashboard/comments", () => {
  it("should retrieve reported comments for an admin", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await User.findOne({ username: "ashry" });

    const login2 = await request(app)
      .post("/login")
      .send({ username: "abbas", password: "12345678" })
      .expect(200);
    const user2 = await User.findOne({ username: "abbas" });

    const response = await request(app)
      .post(`/comments/${commentId}/report`)
      .set("Authorization", "Bearer " + user2.tokens[0].token)
      .send({
        reason: "Offensive content",
        subreason: "This comment contains offensive language",
      })
      .expect(201);

    const res = await request(app)
      .get("/dashboard/comments")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

    expect(res.body.reportedComments.length).toBeGreaterThan(0);
    expect(res.body.message).toBe("Comments have been retrived successfully");
  });

  it("should return 403 for non-admin user", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "abbas", password: "12345678" })
      .expect(200);
    const user = await User.findOne({ username: "abbas" });

    const res = await request(app)
      .get("/dashboard/comments")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(403);
  });
});
describe("GET /dashboard/posts", () => {
  it("should retrieve reported posts for an admin", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "ashry", password: "123456789" })
      .expect(200);
    const user = await User.findOne({ username: "ashry" });

    const login2 = await request(app)
      .post("/login")
      .send({ username: "abbas", password: "12345678" })
      .expect(200);
    const user2 = await User.findOne({ username: "abbas" });

    const response3 = await request(app)
      .post(`/${postId}/report`)
      .send({ reason: "amira12amira", sureason: "12345678" })
      .set("Authorization", "Bearer " + user2.tokens[0].token)
      .expect(201);

    const res = await request(app)
      .get("/dashboard/posts")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

    expect(res.body.reportedPosts.length).toBeGreaterThan(0);
    expect(res.body.message).toBe("Posts have been retrived successfully");
  });

  it("should return 403 for non-admin user", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "abbas", password: "12345678" })
      .expect(200);
    const user = await User.findOne({ username: "abbas" });
    const res = await request(app)
      .get("/dashboard/posts")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(403);
  });
});
