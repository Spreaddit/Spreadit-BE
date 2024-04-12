const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule");
const jwt = require("jwt-decode");

const connectionUrl = "mongodb://localhost:27017/testDBforCommunity";

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
  await Community.deleteMany({});
  await Rule.deleteMany({});
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("Adding a rule", () => {
  test("It should add a new rule", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });

    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const logIn = await request(app).post("/login").send({ username: "farouquser", password: "12345678" });

    const token = logIn.body.access_token;
    const decoded = jwt.jwtDecode(token);
    const user = await User.findById(decoded._id);

    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(200);
    expect(response.body.message).toBe("Rule added successfully");
  });
  test("It should return 'Invalid rule data' for status 400", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });

    const logIn = await request(app).post("/login").send({ username: "farouquser", password: "12345678" });
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });
    const token = logIn.body.access_token;
    const decoded = jwt.jwtDecode(token);
    const user = await User.findById(decoded._id);

    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
    const response = await request(app).post("/rule/add").set("Authorization", `Bearer ${token}`).send({}).expect(400);

    expect(response.body.message).toBe("Invalid rule data");
  });

  test("It should return 'Error' for status 401", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });

    const logIn = await request(app).post("/login").send({ username: "farouquser", password: "12345678" });

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${logIn.body.access_token}`)
      .send({})
      .expect(401);

    expect(response.body.message).toBe("Error");
  });

  test("It should return 'You are not a moderator of this community' for status 402", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const token = logIn.body.access_token;

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [],
    });
    await createdCommunity.save();

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("You are not a moderator of this community");
  });

  test("It should return 'Title already used' for status 403", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    await request(app).post("/rule/add").set("Authorization", `Bearer ${token}`).send({
      title: "myRule",
      communityName: "farouqfans",
    });

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(403);

    expect(response.body.message).toBe("Title already used");
  });

  test("It should return 'Community not found' for status 404", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });
    const token = logIn.body.access_token;
    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "hello",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Removing a rule", () => {
  test("It should remove a rule", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    await request(app).post("/rule/add").set("Authorization", `Bearer ${token}`).send({
      title: "myRule",
      communityName: "farouqfans",
    });

    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(200);

    expect(response.body.message).toBe("Rule removed successfully");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);

    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "hello",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });
    await request(app).post("/signup").send({
      email: "farouqdiaa2@gmail.com",
      username: "farouquser2",
      password: "12345678",
    });

    const logIn2 = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
    await User.findOneAndUpdate({ username: "farouquser2" }, { isVerified: true });

    const token2 = logIn2.body.access_token;
    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    await request(app).post("/rule/add").set("Authorization", `Bearer ${token}`).send({
      title: "myRule",
      communityName: "farouqfans",
    });

    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token2}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });

  test("It should return 'Rule not found' for status 404", async () => {
    await request(app).post("/signup").send({
      email: "farouqdiaa@gmail.com",
      username: "farouquser",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "farouquser" }, { isVerified: true });

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "1",
        communityName: "farouqfans",
      })
      .expect(404);

    expect(response.body.message).toBe("Rule not found");
  });
});

describe("Adding community to favorites", () => {
  test("It should add community to favorites", async () => {});
});

describe("Removing community from favorites", () => {
  test("It should remove community from favorites", async () => {});
});

describe("Checking if community is favorite", () => {
  test("It should check if community is favorite", async () => {});
});

describe("Muting community", () => {
  test("It should mute community", async () => {});
});

describe("Unmuting community", () => {
  test("It should unmute community", async () => {});
});

describe("Checking if community is muted", () => {
  test("It should check if community is muted", async () => {});
});

describe("Subscribing to community", () => {
  test("It should subscribe to community", async () => {});
});

describe("Unsubscribing from community", () => {
  test("It should unsubscribe from community", async () => {});
});

describe("Checking if user is subscribed to community", () => {
  test("It should check if user is subscribed to community", async () => {});
});

describe("Getting top communities", () => {
  test("It should get top communities", async () => {});
});

describe("Getting random category", () => {
  test("It should get random category", async () => {});
});

describe("Getting specific category", () => {
  test("It should get specific category", async () => {});
});

describe("Getting community info", () => {
  test("It should get community info", async () => {});
});

describe("Creating a community", () => {
  test("It should create a community", async () => {});
});
