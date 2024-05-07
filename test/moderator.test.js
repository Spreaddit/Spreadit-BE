const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule");
const Moderator = require("../src/models/moderator");

const connectionUrl = "mongodb://localhost:27017/testDBforModerator";
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const communityId = new mongoose.Types.ObjectId();
const communityId2 = new mongoose.Types.ObjectId();
const communityId3 = new mongoose.Types.ObjectId();

const modId = new mongoose.Types.ObjectId();
const modId2 = new mongoose.Types.ObjectId();
const modId3 = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Farouq Diaa",
  username: "farouquser",
  email: "farouqdiaa@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true,
};
const userTwo = {
  _id: userTwoId,
  name: "Farouuuq",
  username: "farouquser2",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "farouqdiaa2@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true,
};

const community = {
  _id: communityId,
  name: "farouqfans",
  communityType: "Public",
  category: "abc",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  creator: userOneId,
  members: [userOneId],
  moderators: [userOneId],
  membersCount: 1,
};

const community2 = {
  _id: communityId2,
  name: "farouqfans2",
  communityType: "Public",
  category: "Technology",
  rules: ["624a6a677c8d9c9f5fd5eb3d"],
  description:
    "Dive into the world of music, share your favorite songs, artists, genres, and concert experiences with fellow music enthusiasts.",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  creator: userTwoId,
  members: [userTwoId],
  moderators: [userTwoId],
  membersCount: 1,
};

const rule = {
  _id: "624a6a677c8d9c9f5fd5eb3d",
  title: "Music Maniacs Lounge Community Guidelines",
  description:
    "1. Share and appreciate diverse musical tastes and genres with respect for fellow members.",
  reportReason: "Violation of community guidelines",
  communityName: "MusicManiacsLounge",
  appliesTo: "both",
};

const community3 = {
  _id: communityId3,
  name: "farouqfans3",
  communityType: "Private",
  category: "abc",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  creator: userTwoId,
  members: [userTwoId],
  moderators: [userTwoId],
  membersCount: 1,
};

const mod = {
  _id: modId,
  username: "farouquser",
  communityName: "farouqfans",
  managePostsAndComments: true,
  manageUsers: true,
  manageSettings: true,
  isAccepted: true,
};

const mod2 = {
  _id: modId2,
  username: "farouquser2",
  communityName: "farouqfans2",
  managePostsAndComments: true,
  manageUsers: true,
  manageSettings: true,
  isAccepted: true,
};

const mod3 = {
  _id: modId3,
  username: "farouquser2",
  communityName: "farouqfans3",
  managePostsAndComments: true,
  manageUsers: true,
  manageSettings: true,
  isAccepted: true,
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
  await Community.deleteMany({});
  await Moderator.deleteMany({});
  await Rule.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Community(community).save();
  await new Community(community2).save();
  await new Community(community3).save();
  await new Moderator(mod).save();
  await new Moderator(mod2).save();
  await new Moderator(mod3).save();
  await new Rule(rule).save();
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("Adding a rule", () => {
  test("It should add a new rule", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });

    const token = logIn.body.access_token;
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
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid rule data");
  });

  test("It should return 'You are not a moderator of this community' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });

    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "myRule",
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe(
      "You are not a moderator of this community"
    );
  });

  test("It should return 'Title already used' for status 403", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/rule/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    const logIn2 = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
    const token2 = logIn2.body.access_token;

    await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

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

describe("Edit rule", () => {
  test("It should edit a rule", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "myRule", communityName: "farouqfans" });

    const response = await request(app)
      .put("/rule/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
        oldTitle: "myRule",
        newRule: {
          title: "updatedRule",
          description: "Updated rule description",
          reportReason: "Violation of community guidelines",
          appliesTo: "posts",
        },
      })
      .expect(200);

    expect(response.body.message).toBe("Rule edited successfully");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/rule/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/rule/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "nonexistentCommunity",
        oldTitle: "myRule",
        newRule: {
          title: "updatedRule",
          description: "Updated rule description",
          reportReason: "Violation of community guidelines",
          appliesTo: "posts",
        },
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/rule/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
        oldTitle: "myRule",
        newRule: {
          title: "updatedRule",
          description: "Updated rule description",
          reportReason: "Violation of community guidelines",
          appliesTo: "posts",
        },
      })
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });

  test("It should return 'Rule not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/rule/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
        oldTitle: "nonexistentRule",
        newRule: {
          title: "updatedRule",
          description: "Updated rule description",
          reportReason: "Violation of community guidelines",
          appliesTo: "posts",
        },
      })
      .expect(404);

    expect(response.body.message).toBe("Rule not found");
  });
});

describe("Get rules", () => {
  test("It should get rules of a community", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get("/community/farouqfans/rules")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveLength(0);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get("/community/nonexistentCommunity/rules")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Adding a removal reason", () => {
  test("It should add a new removal reason", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      })
      .expect(200);

    expect(response.body.message).toBe("Removal reason added successfully");
  });

  test("It should return 'Invalid removal reason data' for status 400", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid removal reason data");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Nonexistent Community",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'You are not a moderator of this community' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      })
      .expect(402);

    expect(response.body.message).toBe(
      "You are not a moderator of this community"
    );
  });

  test("It should return 'Max number of removal reasons reached' for status 405", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    await Community.findByIdAndUpdate(communityId, {
      removalReasons: Array(50).fill(removalReasonId),
    });

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      })
      .expect(405);

    expect(response.body.message).toBe("Max number of removal reasons reached");
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser" },
      { manageSettings: false }
    );

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });
});

describe("Removing a removal reason", () => {
  test("It should remove a removal reason", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const removalReasonResponse = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      });

    const removalReasonId = removalReasonResponse.body._id;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "Test Community",
        rId: removalReasonId,
      })
      .expect(200);

    expect(response.body.message).toBe("Removal reason removed successfully");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "Nonexistent Community",
        rId: mongoose.Types.ObjectId().toString(),
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "Test Community",
        rId: mongoose.Types.ObjectId().toString(),
      })
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });

  test("It should return 'Removal reason not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "Test Community",
        rId: mongoose.Types.ObjectId().toString(),
      })
      .expect(404);

    expect(response.body.message).toBe("Removal reason not found");
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser" },
      { manageSettings: false }
    );

    const removalReasonResponse = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "Test Community",
      });

    const removalReasonId = removalReasonResponse.body._id;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "Test Community",
        rId: removalReasonId,
      })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });
});

describe("Getting community info", () => {
  test("It should return community info for a valid community name", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    const communityName = "farouqfans";
    const response = await request(app)
      .get(`/community/${communityName}/get-info`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(response.body.name).toBe(communityName);
  });

  test("It should return 'Community not found' for non-existing community name", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    const nonExistingCommunityName = "nonexistingcommunity";
    const response = await request(app)
      .get(`/community/${nonExistingCommunityName}/get-info`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});
