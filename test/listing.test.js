const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = "mongodb://localhost:27017/testDBforlisting";

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
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /new", () => {
  test("It should sort post by new", async () => {
    const signupResponse = await request(app).post("/signup").send({
      email: "amiraelgarf991234@gmail.com",
      username: "amira12amira",
      password: "12345678",
    });
    const usernameee = "amira12amira";

    await User.findOneAndUpdate({ username: usernameee }, { isVerified: true });

    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "amira12amira", password: "12345678" });

    const tokenlogin = loginResponse.body.access_token;

    const newPost = {
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    };

    const response = await request(app)
      .get("/home/new")
      .set("Authorization", `Bearer ${tokenlogin}`)
      .expect(200);
  });
});

describe("get posts sorted by best", () => {
  test("It should return 404 if no posts found", async () => {
    await request(app).get("/home/best").expect(404);
  });
});

describe("get posts sorted by hotness", () => {
  test("It should return 404 if no posts found", async () => {
    await request(app).get("/home/hot").expect(404);
  });
});

describe("get posts sorted by time", () => {
  test("It should return 404 if no posts found", async () => {
    await request(app).get("/home/new").expect(404);
  });
});

describe("get posts sorted by votes", () => {
  test("It should return 404 if no posts found", async () => {
    await request(app).get("/home/top").expect(404);
  });
});
