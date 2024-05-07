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

const connectionUrl = "mongodb://localhost:27017/testDBlisting";

beforeAll(async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany({});
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
});

afterAll(() => {
  mongoose.connection.close();
});

const AdminId = "6240cb6a412efa3d5d89c0af";
id = new mongoose.Types.ObjectId();
id2 = new mongoose.Types.ObjectId();
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
  password: "12345678",
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

describe("sort post by new", () => {
  test("It should sort by new", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by hot", () => {
  test("It should sort by hot", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by hot", () => {
  test("It should return 401", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/hot")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by views", () => {
  test("It should sort by views", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/views")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by views", () => {
  test("It should return 401", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/views")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by number of comments", () => {
  test("It should sort by number of comments", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/comments")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
describe("sort post by number of comments", () => {
  test("It should return 401 unauthorized", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/comments")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by ", () => {
  test("It should sort by best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/best")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by ", () => {
  test("It should return 401", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/best")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by  hot in supspreadit", () => {
  test("It should sort by best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/subspreadit/testCommunity/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by  hot in supspreadit", () => {
  test("It should unauthorized", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/subspreadit/testCommunity/hot")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by new in community", () => {
  test("It should sort by best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/subspreadit/testCommunity/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by new in community", () => {
  test("It should return unauthorized", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/subspreadit/testCommunity/new")
      .set("Authorization", `Bearer`)
      .expect(401);
  });
});

describe("It should sort by best ", () => {
  test("It should sort by best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app).get("/subspreadit/testCommunity/new").expect(401);
  });
});

describe("sort post by new in community best if no posts found", () => {
  test("It should return 404 if no posts found", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/ff/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in hot in community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/ff/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top in community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/ff/top")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/best")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top now", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/now")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top today", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/day")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top month", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top week", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/week")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top year", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in sorting by comments", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/comments")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in sorting by views", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/views")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community now", () => {
  test("It should sort by top", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/now")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/now")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/day")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/week")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/month")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/year")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top in community now", () => {
  test("It should return unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/alltime")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/day")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/now")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/week")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today unauthorized", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/alltime")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by top month", () => {
  test("It should sort by top month", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top year", () => {
  test("It should sort by top year", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top week", () => {
  test("It should sort by top week", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/week")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top month", () => {
  test("It should sort by top month", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});
    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer ${token}`)

      .expect(404);
  });
});

describe("sort post by top year", () => {
  test("It should sort by top year", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await Post.deleteMany({});

    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by recent", () => {
  test("It should sort by recent", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/recentposts")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by recent", () => {
  test("It should return unauthorized 401", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/home/recentposts")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("sort post by random in community ", () => {
  test("It should sort by top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });

    await request(app)
      .get("/subspreadit/testCommunity/random")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community now", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/now")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community day", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/day")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community week", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/week")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community month", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community year", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community alltime", () => {
  test("It should return 404 if community notfound or no posts in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/Community/top/alltime")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top in community day", () => {
  test("It should sort by top", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/day")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community all time", () => {
  test("It should sort by top", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/alltime")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community week", () => {
  test("It should sort by top", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "maher",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/week")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community month", () => {
  test("It should sort by top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top in community year", () => {
  test("It should sort by top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/subspreadit/testCommunity/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top now", () => {
  test("It should sort by top now", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/now")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
describe("sort post by top alltime", () => {
  test("It should sort by top alltime", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/alltime")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by top today", () => {
  test("It should sort by top today", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "testCommunity",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });

    await request(app)
      .get("/home/top/day")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
