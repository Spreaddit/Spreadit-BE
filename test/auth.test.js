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


test("Test login should login user with valid credentials(username)", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });


  const response = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" })
    .expect(200);
});

test("Test login should login user with valid credentials(email)", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });

  const response = await request(app)
    .post("/login")
    .send({ username: "amiraelgarf99@gmail.com", password: "12345678" })
    .expect(200);
}, 10000);

test("Test login should return error for invalid credentials", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const response = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12367845" })
    .expect(401);

  expect(response.body.message).toBe("The credentials are invalid.");
});


test('Test forgot-password should return 404 if user not found', async () => {

  await request(app)
    .post('/forgot-password')
    .send({ username: "amira12", email: "amiraelgarf99@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe('User not found');
    });
});

test('Test forgot-passwordshould return 400 if email does not match username', async () => {

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

test('Test forgot-password should send reset password email and return 200 if user found', async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  await request(app)
    .post('/forgot-password')
    .send({ username: "amira12", email: "amiraelgarf99@gmail.com" })
    .expect(200)
});


test('should return 401 if token is missing', async () => {
  await request(app)
    .post('/reset-password')
    .expect(401)
    .then((response) => {
      expect(response.body.message).toBe('Token is required');
    });
});

test("Test password reset request from inside the settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .post('/reset-password')
    .send({ token: tokenlogin, newPassword: "123321123", currentPassword: "12345678" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe('Password reset successfully');
    });
});

test('Test reset-password should return 400 if current password is invalid', async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .post('/reset-password')
    .send({ token: tokenlogin, newPassword: "123321123", currentPassword: "12345687" })
    .expect(400)
    .then((response) => {
      expect(response.body.message).toBe('Invalid current password');
    });
});

test('Test forgot-username should return 404 if user not found', async () => {

  await request(app)
    .post('/forgot-username')
    .send({ email: "amiraelgarf99@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe('User not found');
    });
});

test('Test forgot-username should return 400 if email does not match username', async () => {

  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });

  await request(app)
    .post('/forgot-username')
    .send({ email: "elgarfamira4@gmail.com" })
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe("User not found");
    });
});

test('Test forgot-username should send reset password email and return 200 if user found', async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  await request(app)
    .post('/forgot-username')
    .send({ email: "amiraelgarf99@gmail.com" })
    .expect(200)
});

//start of layout setting test

test("Test password match (layout-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/layout')
    .send({ token: tokenlogin, enteredPassword: "12345678" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe('Password matches');
    });
});

test("Test password not match (layout-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/layout')
    .send({ token: tokenlogin, enteredPassword: "123456789" })
    .expect(401)
    .then((response) => {
      expect(response.body.error).toBe('Current password is incorrect');
    });
});

test("Test userID not given (layout-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/layout')
    .send({ enteredPassword: "123456789" })
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of layout setting test

//start of feed setting test
test("Test get feed settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/feed')
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        communityContentSort: "Hot",
        globalContentView: "Card",
        communityThemes: true,
        autoplayMedia: true,
        adultContent: false,
        openPostsInNewTab: false
      });
    });
});

test("Test update feed settings success.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/feed')
    .send({ token: tokenlogin, adultContent: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (feed-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/feed')
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of feed setting test


//start of profile setting test
test("Test get profile settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/profile')
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        banner: "",
        nsfw: false,
        activeInCommunityVisibility: true,
        clearHistory: false,
        allowFollow: true
      });
    });
});

test("Test update profile settings success.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/profile')
    .send({ token: tokenlogin, nsfw: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (profile-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/profile')
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of profile setting test

//start of Safety and Privacy setting test
test("Test get Safety and Privacy settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/safety-privacy')
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        blockedUsers: [],
        mutedCommunities: []
      });
    });
});

test("Test update Safety and Privacy settings success.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/safety-privacy')
    .send({ token: tokenlogin, nsfw: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (SafetyandPrivacy-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/safety-privacy')
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of Safety and Privacy setting test


//start of email setting test
test("Test get email settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/email')
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        chatRequestEmail: true,
        unsubscribeAllEmails: false,
        newFollowerEmail: true
      });
    });
});

test("Test update email settings success.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/email')
    .send({ token: tokenlogin, chatRequestEmail: "false" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (email-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/email')
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of email setting test

//start of block setting test
test("Test get block settings.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/blocking-permissions')
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        allowFollow: true
      });
    });
});

test("Test update block settings success.", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .put('/blocking-permissions')
    .send({ token: tokenlogin, allowFollow: "false" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (block-setting).", async () => {
  const signup = await request(app)
    .post("/signup")
    .send({
      email: "amiraelgarf99@gmail.com",
      username: "amira12",
      password: "12345678",
    });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token
  const response = await request(app)
    .get('/blocking-permissions')
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe('User ID is required');
    });
});

//end of block setting test