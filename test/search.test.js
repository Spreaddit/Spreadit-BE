const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const jwt = require("jwt-decode");
const Message = require("../src/models/message");
const Conversation = require("../src/models/conversation");
const connectionUrl = "mongodb://localhost:27017/testDBforsearch";
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "myPassw@ord123",
  gender: "Male",
  isVerified: true,
};
const userTwo = {
  _id: userTwoId,
  name: "mahmoud aly",
  username: "mahmoud",
  email: "mahmoud66@gmail.com",
  password: "12345678",
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

beforeEach(async () => {}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("get history", () => {
  test("It get search history", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    console.log(userOne);
    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .get("/history")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});
