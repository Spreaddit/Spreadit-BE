const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = "mongodb://localhost:27017/testDBforSettings";

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

//start of layout setting test

test("Test password match (layout-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/layout")
    .send({ token: tokenlogin, enteredPassword: "12345678" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Password matches");
    });
});

test("Test password not match (layout-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/layout")
    .send({ token: tokenlogin, enteredPassword: "123456789" })
    .expect(401)
    .then((response) => {
      expect(response.body.error).toBe("Current password is incorrect");
    });
});

test("Test userID not given (layout-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/layout")
    .send({ enteredPassword: "123456789" })
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of layout setting test

//start of feed setting test
test("Test get feed settings.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/feed")
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
        openPostsInNewTab: false,
      });
    });
});

test("Test update feed settings success.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/feed")
    .send({ token: tokenlogin, adultContent: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (feed-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/feed")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of feed setting test

//start of profile setting test
test("Test get profile settings.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/profile")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        banner: "",
        nsfw: false,
        activeInCommunityVisibility: true,
        clearHistory: false,
        allowFollow: true,
      });
    });
});

test("Test update profile settings success.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/profile")
    .send({ token: tokenlogin, nsfw: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (profile-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/profile")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of profile setting test

//start of Safety and Privacy setting test
test("Test get Safety and Privacy settings.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/safety-privacy")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        blockedUsers: [],
        mutedCommunities: [],
      });
    });
});

test("Test update Safety and Privacy settings success.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/safety-privacy")
    .send({ token: tokenlogin, nsfw: "true" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (SafetyandPrivacy-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/safety-privacy")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of Safety and Privacy setting test

//start of email setting test
test("Test get email settings.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/email")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        chatRequestEmail: true,
        unsubscribeAllEmails: false,
        newFollowerEmail: true,
      });
    });
});

test("Test update email settings success.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/email")
    .send({ token: tokenlogin, chatRequestEmail: "false" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (email-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/email")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of email setting test

//start of account settings testing
test("Test get account settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .get("/account")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        email: "amiraelgarf99@gmail.com",
        country: "",
        connectedAccounts: [],
      });
    });
});

test("Test get account settings without id", async () => {
  const response = await request(app)
    .get("/account")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test update account settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });

  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });

  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .put("/account")
    .send({
      token: tokenlogin,
      email: "newemail@gmail.com",
      gender: "male",
      country: "Egypt",
    })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test update account settings without id", async () => {
  const response = await request(app)
    .put("/account")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test update account settings with invalid email format", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });

  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });

  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/account")
    .send({ token: tokenlogin, email: "" })
    .expect(403)
    .then((response) => {
      expect(response.body.error).toBe("Invalid email format");
    });
});

test("Test delete account success", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });

  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });

  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .delete("/account")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Account deleted successfully");
    });
});

test("Test delete account without id", async () => {
  const response = await request(app)
    .put("/account")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of account settings testing

//start of block setting test
test("Test get block settings.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/blocking-permissions")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        allowFollow: true,
      });
    });
});

test("Test update block settings success.", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .put("/blocking-permissions")
    .send({ token: tokenlogin, allowFollow: "false" })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test userID not given (block-setting).", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;
  const response = await request(app)
    .get("/blocking-permissions")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of block setting test

//start of notifications setting test

test("Test get notification settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .get("/notifications")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        mentions: true,
        comments: true,
        upvotesComments: true,
        upvotesPosts: true,
        replies: true,
        newFollowers: true,
        invitations: true,
        posts: false,
      });
    });
});

test("Test get notification settings without token", async () => {
  const response = await request(app)
    .get("/notifications")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test update notification settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .put("/notifications")
    .send({
      token: tokenlogin,
      mentions: false,
      comments: false,
      upvotesComments: false,
      upvotesPosts: false,
      replies: false,
      newFollowers: false,
      invitations: false,
      posts: true,
    })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test update notification settings without token", async () => {
  const response = await request(app)
    .put("/notifications")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of notifications setting test

//start of chat and messaging settings test

test("Test get chat and messaging settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .get("/chat-and-messaging")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        sendYouFriendRequests: "Everyone",
        sendYouPrivateMessages: "Everyone",
        approvedUsers: [],
      });
    });
});

test("Test get chat and messaging settings without token", async () => {
  const response = await request(app)
    .get("/chat-and-messaging")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test update chat and messaging settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .put("/chat-and-messaging")
    .send({
      token: tokenlogin,
      sendYouFriendRequests: "Nobody",
      sendYouPrivateMessages: "Nobody",
      approvedUsers: [],
    })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test update chat and messaging settings without token", async () => {
  const response = await request(app)
    .put("/chat-and-messaging")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test marking all messages as read", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .post("/chat-and-messaging")
    .send({ token: tokenlogin })
    .expect(200);
});

//end of chat and messaging settings test

//start of contact settings test

test("Test get contact settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const userId = signup.body.user.id;
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .get("/contact")
    .send({ token: tokenlogin })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        _id: userId,
        inboxMessages: true,
        chatMessages: true,
        chatRequests: true,
        mentions: true,
        repliesToComments: true,
        newFollowers: true,
        cakeDay: true,
        modNotifications: true,
      });
    });
});

test("Test get contact settings without token", async () => {
  const response = await request(app)
    .get("/contact")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

test("Test update contact settings", async () => {
  const signup = await request(app).post("/signup").send({
    email: "amiraelgarf99@gmail.com",
    username: "amira12",
    password: "12345678",
  });
  const login = await request(app)
    .post("/login")
    .send({ username: "amira12", password: "12345678" });
  const tokenlogin = login.body.access_token;

  const response = await request(app)
    .put("/contact")
    .send({
      token: tokenlogin,
      inboxMessages: false,
      chatMessages: false,
      chatRequests: false,
      mentions: false,
      commentsOnYourPost: false,
      commentsYouFollow: false,
      upvotes: false,
      repliesToComments: false,
      newFollowers: false,
      cakeDay: false,
      modNotifications: false,
    })
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe("Successful update");
    });
});

test("Test update contact settings without token", async () => {
  const response = await request(app)
    .put("/contact")
    .send({})
    .expect(400)
    .then((response) => {
      expect(response.body.error).toBe("User ID is required");
    });
});

//end of contact settings test
