const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule");
const Moderator = require("../src/models/moderator");

const connectionUrl = "mongodb://localhost:27017/testDBforCommunity";
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

describe("Adding community to favorites", () => {
  test("It should add community to favorites", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);

    expect(response.body.message).toBe(
      "Community added to favorites successfully"
    );
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "hello",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Community is already in favorites' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });

    const response = await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is already in favorites");
  });
});

describe("Removing community from favorites", () => {
  test("It should remove community from favorites", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });
    const response = await request(app)
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);
    expect(response.body.message).toBe(
      "Community removed from favorites successfully"
    );
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "hello",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Community is not in favorites' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is not in favorites");
  });
});

describe("Checking if community is favorite", () => {
  test("It should return true if community is favourite", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" });

    const response = await request(app)
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" });
    expect(response.status).toBe(200);
    expect(response.body.isFavourite).toBe(true);
  }, 10000);

  test("It should return false if community is not favorite", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans2" });
    expect(response.status).toBe(200);
    expect(response.body.isFavourite).toBe(false);
  }, 10000);

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  }, 10000);

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "hello" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  }, 10000);
});

describe("Muting community", () => {
  test("It should mute community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);

    expect(response.body.message).toBe("Community muted successfully");
  });
  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });
  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "hello",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Community is already muted' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });
    await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });
    const response = await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is already muted");
  });
});

describe("Unmuting community", () => {
  test("It should unmute community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });
    const response = await request(app)
      .post("/community/unmute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);

    expect(response.body.message).toBe("Community unmuted successfully");
  });
  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unmute")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unmute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "none",
      })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Community is not muted' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unmute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is not muted");
  });
});

describe("Checking if community is muted", () => {
  test("It should return true if community is muted", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/mute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      });
    const response = await request(app)
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isMuted).toBe(true);
  }, 10000);

  test("It should return false if community is not muted", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    const response = await request(app)
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isMuted).toBe(false);
  }, 10000);

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  }, 10000);

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "hello" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  }, 10000);
});

describe("Subscribing to community", () => {
  test("It should subscribe to the community successfully", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.message).toBe(
      "Subscribed to the community successfully"
    );
  });
  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Restricted or Private community' for status 403", async () => {
    const logIn2 = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });

    const logIn = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans3" })
      .expect(403);

    expect(response.body.message).toBe("Restricted or Private community");
  });

  test("It should return 'User is already subscribed' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" });
    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(400);

    expect(response.body.message).toBe("User is already subscribed");
  });
});

describe("Unsubscribing from community", () => {
  test("It should unsubscribe from the community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" });

    const response = await request(app)
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.message).toBe(
      "Unsubscribed from the community successfully"
    );
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'User isn't subscribed to community' for status 403", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(403);

    expect(response.body.message).toBe("User isn't subscribed to community");
  });
});

describe("Checking if user is subscribed to a community", () => {
  test("It should return true if user is subscribed", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" });

    const response = await request(app)
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isSubscribed).toBe(true);
  }, 10000);

  test("It should return false if user is not subscribed", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isSubscribed).toBe(false);
  }, 10000);

  test("It should return 'Invalid parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid parameters");
  }, 10000);

  test("It should return 'Community not found' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  }, 10000);
});

describe("Getting top communities", () => {
  test("It should return top public communities", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/top-communities")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.communities).toBeDefined();
    expect(response.body.currentPage).toBeDefined();
    expect(response.body.totalPages).toBeDefined();
  });
});

describe("Getting random category communities", () => {
  test("It should return random category communities", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/random-category")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
describe("Getting specific category communities", () => {
  test("It should return specific category communities", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/get-specific-category?category=Technology")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test("It should return 'No communities found for the specified category' for status 404", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/get-specific-category")
      .set("Authorization", `Bearer ${token}`)

      .query({ category: "helloo" })
      .expect(404);

    expect(response.body.message).toBe(
      "No communities found for the specified category"
    );
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .get("/community/get-specific-category")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });
});

describe("Creating a community", () => {
  test("It should create a community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "farouqfans4",
        is18plus: true,
        communityType: "Public",
      })
      .expect(200);

    expect(response.body.message).toBe("Community created successfully");
  });

  test("It should return 'Community name is not available' for status 403", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "farouqfans",
        is18plus: true,
        communityType: "Public",
      })
      .expect(403);

    expect(response.body.message).toBe("Community name is not available");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .post("/community/create")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });
});

////////////////////////////////////////////////////////////////////////
// GET USER INFO AND UPDATE USER INFO TESTS
////////////////////////////////////////////////////////////////////////

describe("Getting user profile info", () => {
  test("It should return user profile info", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });

    const response = await request(app)
      .get("/user/profile-info/farouquser")
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test("It should return 'User not found' for status 404", async () => {
    const response = await request(app)
      .get("/user/profile-info/notfarouq")
      .expect(404);
    expect(response.body.message).toBe("User not found");
  });
});
describe("Updating user profile info", () => {
  test("It should update user profile info", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/user/profile-info")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "NewFarouq",
        about: "New bio",
        username: "NEWWWW",
        isVisible: true,
        isActive: true,
      })
      .expect(200);

    expect(response.body).toBeDefined();
  });
  test("It should return 'Username not available' for status 400", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const response = await request(app)
      .put("/user/profile-info")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "farouquser2",
      })
      .expect(400);

    expect(response.body.message).toBe("Username not available");
  });
});

////////////////////////////////////////////////////////////////////////
