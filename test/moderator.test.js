const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule");
const Moderator = require("../src/models/moderator");
const RemovalReason = require("../src/models/removalReason");

const connectionUrl = "mongodb://localhost:27017/testDBforModerator";
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const communityId = new mongoose.Types.ObjectId();
const communityId2 = new mongoose.Types.ObjectId();
const communityId3 = new mongoose.Types.ObjectId();
removalId = new mongoose.Types.ObjectId();

const modId = new mongoose.Types.ObjectId();
const modId2 = new mongoose.Types.ObjectId();
const modId3 = new mongoose.Types.ObjectId();
const modId4 = new mongoose.Types.ObjectId();
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
const removalReason = {
  _id: removalId,
  title: "myRemovalReason",
  reasonMessage: "message",
  communityName: "farouqfans2",
};
const community2 = {
  _id: communityId2,
  name: "farouqfans2",
  communityType: "Public",
  category: "Technology",
  rules: ["624a6a677c8d9c9f5fd5eb3d"],
  removalReasons: [removalId],
  description:
    "Dive into the world of music, share your favorite songs, artists, genres, and concert experiences with fellow music enthusiasts.",
  is18plus: false,
  allowNfsw: true,
  allowSpoile: true,
  creator: userTwoId,
  members: [userTwoId],
  moderators: [userTwoId, userOneId],
  contributors: [userOneId],
  membersCount: 1,
  settings: {
    postTypeOptions: "any",
    spoilerEnabled: true,
    multipleImagesPerPostAllowed: true,
    pollsAllowed: true,
    commentSettings: { mediaInCommentsAllowed: true },
  },
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
const mod4 = {
  _id: modId4,
  username: "farouquser",
  communityName: "farouqfans2",
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
  await RemovalReason.deleteMany({});
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Community(community).save();
  await new Community(community2).save();
  await new Community(community3).save();
  await new Moderator(mod).save();
  await new Moderator(mod2).save();
  await new Moderator(mod3).save();
  await new RemovalReason(removalReason).save();
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
        communityName: "farouqfans",
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
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "farouqfans",
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
    removalReasonId = new mongoose.Types.ObjectId();
    await Community.findByIdAndUpdate(communityId, {
      removalReasons: Array(50).fill(removalReasonId),
    });

    const response = await request(app)
      .post("/removal-reason/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Reason",
        reasonMessage: "This is a test removal reason",
        communityName: "farouqfans",
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
        communityName: "farouqfans",
      })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });
});

describe("Removing a removal reason", () => {
  test("It should remove a removal reason", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
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
        rId: removalId,
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
        communityName: "farouqfans2",
        rId: removalId,
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
        communityName: "farouqfans",
        rId: removalId,
      })
      .expect(404);

    expect(response.body.message).toBe("Removal reason not found");
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser2" },
      { manageSettings: false }
    );

    const response = await request(app)
      .post("/removal-reason/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
      })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });
});

describe("Edit Removal Reason", () => {
  test("It should edit a removal reason", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
        newRemovalReason: {
          title: "Updated Removal Reason",
          reasonMessage: "Updated Reason Message",
        },
      })
      .expect(200);

    expect(response.body.message).toBe("Removal reason edited successfully");
  });

  test("It should return 'Invalid removal reason data' for status 400", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
        newRemovalReason: { title: "", reasonMessage: "" },
      })
      .expect(400);

    expect(response.body.message).toBe("Invalid removal reason data");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "NonExistentCommunity",
        rId: removalId,
        newRemovalReason: {
          title: "Updated Removal Reason",
          reasonMessage: "Updated Reason Message",
        },
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
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
        newRemovalReason: {
          title: "Updated Removal Reason",
          reasonMessage: "Updated Reason Message",
        },
      })
      .expect(402);

    expect(response.body.message).toBe(
      "You are not a moderator of this community"
    );
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser2" },
      { manageSettings: false }
    );
    const response = await request(app)
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: removalId,
        newRemovalReason: {
          title: "Updated Removal Reason",
          reasonMessage: "Updated Reason Message",
        },
      })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });

  test("It should return 'Removal Reason not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/removal-reason/edit")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans2",
        rId: new mongoose.Types.ObjectId(),
        newRemovalReason: {
          title: "Updated Removal Reason",
          reasonMessage: "Updated Reason Message",
        },
      })
      .expect(404);

    expect(response.body.message).toBe("Removal Reason not found");
  });
});

describe("Get Removal Reasons", () => {
  test("It should get removal reasons of a community", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/farouqfans2/removal-reasons`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveLength(1);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });

    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/nonexistentCommunity/removal-reasons")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Leave Moderation", () => {
  test("It should leave moderation", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });

    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans2/farouquser2/leave`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Left moderator role successfully");

    const community = await Community.findOne({ name: "farouqfans2" });
    const user = await User.findOne({ username: "farouquser2" });

    expect(community.moderators).not.toContain(user._id);
    expect(user.moderatedCommunities).not.toContain(community._id);
  });

  test("It should return 'User or community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/moderation/nonexistentCommunity/nonexistentUser/leave")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("User or community not found");
  });

  test("It should return 'User is not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans/farouquser2/leave`)
      .set("Authorization", `Bearer ${token}`)
      .expect(402);

    expect(response.body.message).toBe("User is not a moderator");
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

describe("Get Contributors", () => {
  test("It should get contributors of a community", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/contributors`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).toHaveProperty("banner");
    expect(response.body[0]).toHaveProperty("avatar");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/moderation/nonexistentCommunity/contributors")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans/contributors`)
      .set("Authorization", `Bearer ${token}`)
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });
});
describe("Add Contributor", () => {
  test("It should add a contributor to the community", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans/farouquser2/add-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe(
      "User added as contributor successfully"
    );

    const updatedCommunity = await Community.findOne({ name: "farouqfans" });
    expect(updatedCommunity.contributors).toHaveLength(1);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(
        "/community/moderation/nonexistentCommunity/contributorUser/add-contributor"
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans/farouquser/add-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });

  test("It should return 'User not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans2/nonexistentUser/add-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("User not found");
  });

  test("It should return 'User is already a contributor' for status 405", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/moderation/farouqfans2/farouquser/add-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(405);

    expect(response.body.message).toBe("User is already a contributor");
  });
});

describe("Remove Contributor", () => {
  test("It should remove a contributor from the community", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(`/community/moderation/farouqfans2/farouquser/remove-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe(
      "User removed as contributor successfully"
    );

    const updatedCommunity = await Community.findOne({ name: "farouqfans2" });
    expect(updatedCommunity.contributors).toHaveLength(0);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(
        "/community/moderation/nonexistentCommunity/contributorUser/remove-contributor"
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Not a moderator' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(`/community/moderation/farouqfans2/farouquser/remove-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(402);

    expect(response.body.message).toBe("Not a moderator");
  });

  test("It should return 'User not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(
        `/community/moderation/farouqfans2/nonexistentUser/remove-contributor`
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("User not found");
  });

  test("It should return 'User is not a contributor' for status 405", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(`/community/moderation/farouqfans/farouquser2/remove-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(405);

    expect(response.body.message).toBe("User is not a contributor");
  });
});

describe("Is Contributor", () => {
  test("It should return true if user is a contributor", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get(`/community/moderation/farouqfans2/farouquser/is-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.isContributor).toBe(true);
  });

  test("It should return false if user is not a contributor", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get(`/community/moderation/farouqfans/farouquser/is-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.isContributor).toBe(false);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get(
        "/community/moderation/nonexistentCommunity/contributorUser/is-contributor"
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'User not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get(`/community/moderation/farouqfans2/nonexistentUser/is-contributor`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("User not found");
  });
});

describe("Edit Community Info", () => {
  test("It should update community information", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/farouqfans2/edit-info`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "newCommunityName",
        description: "New description",
        communityType: "Public",
      })
      .expect(200);

    expect(response.body.message).toBe(
      "Community information updated successfully"
    );

    const updatedCommunity = await Community.findOne({
      name: "newCommunityName",
    });
    expect(updatedCommunity).toBeTruthy();
    expect(updatedCommunity.description).toBe("New description");
    expect(updatedCommunity.communityType).toBe("Public");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/nonexistentCommunity/edit-info")
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "New description" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser2" },
      { manageSettings: false }
    );
    const response = await request(app)
      .post(`/community/farouqfans2/edit-info`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "New description" })
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });

  test("It should return 'Community name is used' for status 402", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post(`/community/farouqfans2/edit-info`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "farouqfans" })
      .expect(402);

    expect(response.body.message).toBe("Community name is used");
  });
});

describe("Get Community Settings", () => {
  test("It should return community settings", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/farouqfans2/settings`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/nonexistentCommunity/settings")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Moderator doesn't have permission' for status 406", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    await Moderator.findOneAndUpdate(
      { username: "farouquser2" },
      { manageSettings: false }
    );
    const response = await request(app)
      .get(`/community/farouqfans2/settings`)
      .set("Authorization", `Bearer ${token}`)
      .expect(406);

    expect(response.body.message).toBe("Moderator doesn't have permission");
  });
});

describe("Edit Community Settings", () => {
  test("It should update community settings", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put(`/community/farouqfans2/settings`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        postTypeOptions: "text posts only",
        spoilerEnabled: false,
        multipleImagesPerPostAllowed: false,
        pollsAllowed: false,
        commentSettings: { mediaInCommentsAllowed: false },
      })
      .expect(200);

    expect(response.body.message).toBe(
      "Community settings updated successfully"
    );
  });
});

describe("Get Muted Communities", () => {
  test("It should return muted communities", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/muted")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBe(0);
  });

  test("It should return empty array if user has no muted communities", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/muted")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual([]);
  });
});

describe("Get Community Moderators", () => {
  test("It should return community moderators", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/moderators`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/moderation/nonexistentCommunity/moderators")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Get Community Editable Moderators", () => {
  test("It should return community editable moderators", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/moderators/editable`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/moderation/nonexistentCommunity/moderators/editable")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});
describe("Get Community Invited Moderators", () => {
  test("It should return invited moderators", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/invited-moderators`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBe(0);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/moderation/nonexistentCommunity/invited-moderators")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Remove Moderator Invitation", () => {
  test("It should remove moderator invitation", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    await request(app)
      .post(`/community/moderation/farouqfans2/farouquser/invite`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const response = await request(app)
      .delete(`/community/moderation/farouqfans2/farouquser/remove-invite`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Moderator invite removed successfully");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(
        "/community/moderation/nonexistentCommunity/testuser/remove-invite"
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Is Moderator", () => {
  test("It should return whether the user is a moderator or not", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/farouquser/is-moderator`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.isModerator).toBe(false);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(
        `/community/moderation/nonexistentCommunity/farouquser2/is-moderator`
      )
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});
describe("Is Invited", () => {
  test("It should return whether the user is invited or not", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    await request(app)
      .post(`/community/moderation/farouqfans2/farouquser/invite`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const response = await request(app)
      .get(`/community/moderation/farouqfans2/farouquser/is-invited`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.isInvited).toBe(true);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/nonexistentCommunity/farouquser/is-invited`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

describe("Get Moderated Communities", () => {
  test("It should return the moderated communities for the user", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/moderation/user/farouquser2`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  test("It should return 'User not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/moderation/user/nonexistentUser")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("User not found");
  });
});

describe("Update Moderation Permissions", () => {
  test("It should update moderation permissions successfully", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put(`/community/moderation/farouqfans2/farouquser2/permissions`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        managePostsAndComments: true,
        manageUsers: true,
        manageSettings: true,
      })
      .expect(200);
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put(`/community/moderation/nonexistentCommunity/farouquser2/permissions`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        managePostsAndComments: true,
        manageUsers: true,
        manageSettings: true,
      })
      .expect(404);
  });

  test("It should return 'Moderator not found' for status 404", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put(`/community/moderation/farouqfans2/nonexistentUser/permissions`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        managePostsAndComments: true,
        manageUsers: true,
        manageSettings: true,
      })
      .expect(404);
  });
});
describe("Remove Moderator", () => {
  test("It should remove the moderator successfully", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .delete(`/community/moderation/farouqfans2/moderators/farouquser`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("Get Community Insights", () => {
  test("It should return community insights", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/farouqfans2/insights`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("Get Permissions", () => {
  test("It should return moderator permissions", async () => {
    const logIn = await request(app)
      .post("/login")
      .send({ username: "farouquser2", password: "12345678" });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get(`/community/farouqfans2/farouquser/get-permissions`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
