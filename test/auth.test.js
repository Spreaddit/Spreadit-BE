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

beforeAll(async () => {
    try {
      await mongoose.connect(connectionurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error('Mongoose connection error:', error);
    }
  });
  

beforeEach(async () => {
    await User.deleteMany({});
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


test("should login user with valid credentials(username)", async () => {
    const signup = await request(app).post("/signup").send({
        email: "amiraelgarf99@gmail.com",
        username: "amira12",
        password: "12345678",
    });

    
    const response = await request(app)
      .post("/login")
      .send({username: "amira12", password: "12345678"})
      .expect(200);
});

test("should login user with valid credentials(email)", async () => {
    const signup = await request(app)
    .post("/signup")
    .send({
        email: "amiraelgarf99@gmail.com",
        username: "amira12",
        password: "12345678",
    });

    const response = await request(app)
      .post("/login")
      .send({username: "amiraelgarf99@gmail.com", password: "12345678"})
      .expect(200);
}, 10000);

test("should return error for invalid credentials", async () => {
    const signup = await request(app)
    .post("/signup")
    .send({
        email: "amiraelgarf99@gmail.com",
        username: "amira12",
        password: "12345678",
    });
    const response = await request(app)
      .post("/login")
      .send({username: "amira12", password: "12367845"})
      .expect(401);

    expect(response.body.message).toBe("The credentials are invalid.");
});


test('should return 404 if user not found', async () => {

    await request(app)
      .post('/forgot-password')
      .send({ username: "amira12", email: "amiraelgarf99@gmail.com" })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('User not found');
    });
});

test('should return 400 if email does not match username', async () => {
    
    const signup = await request(app)
    .post("/signup")
    .send({
        email: "amiraelgarf99@gmail.com",
        username: "amira12",
        password: "12345678",
    });
    
    await request(app)
      .post('/forgot-password')
      .send({ username: "amira12", email: "elgarfamira4@gmail.com" })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Error, wrong email');
    });
});

test('should send reset password email and return 200 if user found', async () => {
    const signup = await request(app)
    .post("/signup")
    .send({
        email: "amiraelgarf99@gmail.com",
        username: "amira12",
        password: "12345678",
    });
    await request(app)
      .post('/forgot-password')
      .send({ username: "amira12", email: "amiraelgarf99@gmail.com"})
      .expect(200)
});





