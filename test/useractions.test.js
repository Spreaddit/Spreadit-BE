const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const jwt = require("jwt-decode");
const connectionUrl = "mongodb://localhost:27017/testDBforuseraction";
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher12",
  email: "moahmedmaher4@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true,
};
const userTwo = {
  _id: userTwoId,
  name: "mahmoud aly",
  username: "mahmoud12",
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
    await Message.deleteMany({});
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
});

beforeEach(async () => {
  await User.deleteMany({});
  await User(userOne).save();
  await User(userTwo).save();
}, 10000);
afterEach(async () => {
  await User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
});

test("Test: test follow user ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/follow")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
    })
    .expect(200);
});

test("Test: test follow user not found ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/follow")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mah",
    })
    .expect(404);
});

test("Test: test unfollow user not found ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unfollow")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mah",
    })
    .expect(404);
});

test("Test: test block user not found ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/block")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mah",
    })
    .expect(404);
});

test("Test: test unblock user not found ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unblock")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mah",
    })
    .expect(404);
});

test("Test: test report user not found ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/report")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mah",
    })
    .expect(404);
});

test("Test: test report user reason is required ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/report")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
    })
    .expect(400);
});

test("Test: test follow user unauthorized ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/follow")
    .set("Authorization", `Bearer `)
    .send({
      username: "maher12",
    })
    .expect(401);
});

test("Test: test unfollow user ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unfollow")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
    })
    .expect(200);
});
test("Test: test unfollow user unauthorized ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unfollow")
    .set("Authorization", `Bearer `)
    .send({
      username: "maher12",
    })
    .expect(401);
});
test("Test: test block user unauthorized ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/block")
    .set("Authorization", `Bearer `)
    .send({
      username: "maher12",
    })
    .expect(401);
});

test("Test: test unblock user unauthorized ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unblock")
    .set("Authorization", `Bearer `)
    .send({
      username: "maher12",
    })
    .expect(401);
});

test("Test: test report user unauthorized ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/report")
    .set("Authorization", `Bearer `)
    .send({
      username: "maher12",
    })
    .expect(401);
});

test("Test: test block user ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/block")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
    })
    .expect(200);
});

test("Test: test unblock user ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/unblock")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
    })
    .expect(200);
});

test("Test: test report user ", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud12",
    password: "12345678",
  });
  const token = logIn.body.access_token;
  await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
  await request(app)
    .post("/report")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "maher12",
      reason: "spam",
      subreason: "reggg",
    })
    .expect(200);
});
