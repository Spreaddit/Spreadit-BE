const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const bcrypt = require("bcryptjs");

const connectionurl = config.testConnectionString;

getUser = async function (username_email) {
  const user = await User.find({
    $or: [{ email: username_email }, { username: username_email }],
  });
  if (user[0]) {
    return new User(user[0]);
  } else {
    return null;
  }
};

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Amira Elgarf",
  username: "amira12",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "elgarf@gmail.com",
  password: "12345678",
  gender: "Female",
  isVerified: true,
};

beforeAll(async () => {
  try {
    await mongoose.connect(connectionurl, {
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

test("Test: normal user signup", async () => {
  const response = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    })
    .expect(200);
});

test("Test: conflict user signup", async () => {
  await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    })
    .expect(200);
  const response = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    })
    .expect(409);
});

test("Test: user signup with missing data", async () => {
  const response = await request(app)
    .post("/signup")
    .send({
      email: "",
      username: "test",
      password: "12345678",
    })
    .expect(400);
});

test("Test login should login user with valid credentials(username)", async () => {
  const response = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" })
    .expect(200);
});

test("Test login should login user with valid credentials(email)", async () => {
  const response = await request(app)
    .post("/login")
    .send({ username: "amiraelgarf99@gmail.com", password: "12345678" })
    .expect(200);
}, 10000);

test("Test login should return error for invalid credentials", async () => {
  const response = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12367845" })
    .expect(401);

  expect(response.body.message).toBe("The credentials are invalid.");
});

test("Test forgot-password should return 404 if user not found", async () => {
  await request(app)
    .post("/forgot-password")
    .send({ username: "amira123", email: "amiraelgarf99@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("User not found");
    });
});

test("Test forgot-passwordshould return 400 if email does not match username", async () => {
  await request(app)
    .post("/forgot-password")
    .send({ username: "amira12", email: "elgarfamira4@gmail.com" })
    .expect(400)
    .then((response) => {
      expect(response.body.message).toBe("Error, wrong email");
    });
});

test("Test forgot-password should send reset password email and return 200 if user found", async () => {
  await request(app)
    .post("/forgot-password")
    .send({ username: "amira12", email: "amiraelgarf99@gmail.com" })
    .expect(200);
});

test("should return 401 if token is missing", async () => {
  await request(app)
    .post("/reset-password")
    .expect(401)
    .then((response) => {
      expect(response.body.message).toBe("Token is required");
    });
});

test("Test password reset request from inside the settings.", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .post("/reset-password")
    .send({
      token: tokenlogin,
      newPassword: "123321123",
      currentPassword: "12345678",
    })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Password reset successfully");
    });
});

test("Test reset-password should return 400 if current password is invalid", async () => {
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .post("/reset-password")
    .send({
      token: tokenlogin,
      newPassword: "123321123",
      currentPassword: "12345687",
    })
    .expect(400)
    .then((response) => {
      expect(response.body.message).toBe("Invalid current password");
    });
});

test("Test forgot-username should return 404 if user not found", async () => {
  await request(app)
    .post("/forgot-username")
    .send({ email: "amiraelgarf99@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("User not found");
    });
});

test("Test forgot-username should return 400 if email does not match username", async () => {
  await request(app)
    .post("/forgot-username")
    .send({ email: "elgarfamira4@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("User not found");
    });
});

test("Test forgot-username should send reset password email and return 200 if user found", async () => {
  await request(app)
    .post("/forgot-username")
    .send({ email: "amiraelgarf99@gmail.com" })
    .expect(200);
});
