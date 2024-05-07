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

const connectionUrl = "mongodb://localhost:27017/testDBPosts";

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


describe("POST /api/posts", () => {
  test("It should create a new post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "amira12amira",
      type: "Post",
    };

    const response = await request(app)
      .post("/")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .send(newPost)
      .expect(404)
  });
});

describe("POST /api/posts", () => {
  test("It should create a new post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "testCommunity",
      type: "Post",
    };

    const response = await request(app)
      .post("/")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .send(newPost)
      .expect(201)
  });
});
describe("GET posts", () => {
  test("It should retrieve all posts in community", async () => {
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
      .get("/community/" + communityName + "/")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});

describe("GET /api/posts/:id", () => {
  test("It should return 404 if post is not found", async () => {
    await request(app).get("/api/posts/123456789012345678901234").expect(404);
  });
});

describe("PUT /api/posts/:id", () => {
  test("It should return 404 if post is not found", async () => {
    await request(app).put("/api/posts/123456789012345678901234").expect(404);
  });
});

describe("DELETE /api/posts/:id", () => {
  test("It should return 404 if post is not found", async () => {
    await request(app)
      .delete("/api/posts/123456789012345678901234")
      .expect(404);
  });
});

describe("GET saved posts", () => {
  test("It should retrieve all saved posts", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;

    const response = await request(app)
      .get("/save")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(404);
  });
});

describe(" save post", () => {
  test("It should save post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/save")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);

  });
});

describe(" unsave post", () => {
  test("It should unsave post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/unsave")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(400);

  });
});


describe("spoiler a post", () => {
  test("It should spoiler  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/spoiler")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});


describe("unspoiler a post", () => {
  test("It should unspoiler  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/unspoiler")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});

describe("mark as nfsw", () => {
  test("It should nfsw  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/nsfw")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});

describe("mark as not nfsw", () => {
  test("It should unnfsw  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/unnsfw")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});

describe("report post", () => {
  test("It should report  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/report")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(400);
  });
});

describe("report post", () => {
  test("It should report  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/report")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .send({ reason: "test" })
      .expect(201);
  });
});


describe("hide post", () => {
  test("It should hide  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/hide")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(200);
  });
});

describe("unhide post", () => {
  test("It should unhide  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .post("/" + postId + "/unhide")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(400);
  });
});


describe("get hide posts", () => {
  test("It should get hide  post", async () => {
    const login = await request(app)
      .post("/login")
      .send({ username: "maher", password: "12345678" })
      .expect(200);
    const user = await getUser("maher");
    if (!user) {
      throw new Error("User not found");
    }
    const token = login.body.token;
    const cresponse = await request(app)
      .get("/hide")
      .set("Authorization", "Bearer " + user.tokens[0].token)
      .expect(404);
  });
});
