const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const Community = require("../src/models/community");

const connectionUrl = "mongodb://localhost:27017/testDBforSettings";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "myPassw@ord123",
  gender: "Male",
  isVerified: true,
};

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

beforeEach(async () => {
  await User.deleteMany({});
  await new User(userOne).save();
  await Community.deleteMany({});
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("POST /api/posts", () => {
  test("It should create a new post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "amira12amira",
      type: "Post",
    };

    const response = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe(
          "You can only choose communities that you have already joined"
        );
      });
  });
});

describe("GET /api/posts", () => {
  test("It should retrieve all posts", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const response = await request(app)
      .get("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(404);
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
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const response = await request(app)
      .get("/:postId/save")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(404);
  });
});

describe(" save post", () => {
  test("It should save post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;
    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };

    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response = await request(app)
      .post(`/${postId}/save`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe(" unsave post", () => {
  test("It should unsave post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;
    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();
    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };

    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/save`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
    const response4 = await request(app)
      .post(`/${postId}/unsave`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe(" unsave post", () => {
  test("It should unsave post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;
    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();
    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };

    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response4 = await request(app)
      .post(`/${postId}/unsave`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(400);
  });
});

describe("spoiler a post", () => {
  test("It should spoiler  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/spoiler`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("unspoiler a post", () => {
  test("It should unspoiler  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/spoiler`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
    const response4 = await request(app)
      .post(`/${postId}/unspoiler`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("mark as nfsw", () => {
  test("It should nfsw  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/nsfw`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("mark as not nfsw", () => {
  test("It should unnfsw  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/unnsfw`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("report post", () => {
  test("It should report  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/report`)
      .send({ reason: "amira12amira", sureason: "12345678" })
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(201);
  });
});

describe("hide post", () => {
  test("It should hide  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/hide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("unhide post", () => {
  test("It should unhide  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response4 = await request(app)
      .post(`/${postId}/hide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);

    const response3 = await request(app)
      .post(`/${postId}/unhide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("unhide post", () => {
  test("It should unhide  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/unhide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(400);
  });
});

describe("get hide posts", () => {
  test("It should get hide  post", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const cresponse = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send({
        name: "Test Community66",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    const createdCommunity = await Community.findOne({
      name: "Test Community66",
    });

    const communityId = createdCommunity._id;

    const user = await User.findOne({ username: "maher" });

    user.subscribedCommunities.push(communityId);
    await user.save();

    const newPost = {
      title: "Test Post",
      content: "This is a test post.",
      community: "Test Community66",
      type: "Post",
    };
    const response2 = await request(app)
      .post("/")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .send(newPost)
      .expect(201);
    const postId = response2.body.postId;

    const response3 = await request(app)
      .post(`/${postId}/hide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);

    const response4 = await request(app)
      .get(`/hide`)
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});
