const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = "mongodb://localhost:27017/testDBforuseraction";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mahmoud Abbas",
  username: "mahmoud12",
  email: "mahmoudaly552@gmail.com",
  password: "123456789",
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
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

test("Test: test follow user not found ", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "mahmoud12", password: "123456789" });
  const tokenlogin = login.body.access_token;

  const follow = await request(app)
    .post("/follow")
    .send({ username: "mahmoud00", token: tokenlogin })
    .expect(404)
    .then((response) => {
      expect(response.body.error).toBe("User not found");
    });
});

test("Test: test block user not found ", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "mahmoud12", password: "123456789" });
  const tokenlogin = login.body.access_token;

  const block = await request(app)
    .post("/block")
    .send({ username: "mahmoud00", token: tokenlogin })
    .expect(404)
    .then((response) => {
      expect(response.body.error).toBe("User not found");
    });
});

test("Test: test report user not found ", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "mahmoud12", password: "123456789" });
  const tokenlogin = login.body.access_token;

  const report = await request(app)
    .post("/report")
    .send({ username: "mahmoud00", token: tokenlogin, reason: "spam" })
    .expect(404)
    .then((response) => {
      expect(response.body.error).toBe("User not found");
    });
});

test("Test: test unfollow user not found ", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "mahmoud12", password: "123456789" });
  const tokenlogin = login.body.access_token;

  const unfollow = await request(app)
    .post("/unfollow")
    .send({ username: "mahmoud00", token: tokenlogin })
    .expect(404)
    .then((response) => {
      expect(response.body.error).toBe("User not found");
    });
});
