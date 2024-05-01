const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const Community = require("../src/models/community");
const Rule = require("../src/models/rule");
const jwt = require("jwt-decode");

const connectionUrl = "mongodb://localhost:27017/testDBforCommunity";
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Farouq Diaa",
  username: "farouquser",
  email: "farouqdiaa@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true
}
const userTwo = {
  _id: userTwoId,
  name: "Farouuuq",
  username: "farouquser2",
  birth_date: "1999-10-10T00:00:00.000Z",
  email: "farouqdiaa2@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true
}

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
  await new User(userOne).save();
  await new User(userTwo).save();
  await Community.deleteMany({});
  await Rule.deleteMany({});
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("Adding a rule", () => {
  test("It should add a new rule", async () => {
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
    const response = await request(app).post("/rule/add").set("Authorization", `Bearer ${token}`).send({}).expect(400);

    expect(response.body.message).toBe("Invalid rule data");
  });

  test("It should return 'Error' for status 401", async () => {

    const logIn = await request(app).post("/login").send({ username: "farouquser", password: "12345678" });

    const response = await request(app)
      .post("/rule/add")
      .set("Authorization", `Bearer ${logIn.body.access_token}`)
      .send({})
      .expect(401);

    expect(response.body.message).toBe("Error");
  });

  test("It should return 'You are not a moderator of this community' for status 402", async () => {
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });

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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

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
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

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
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;

    const logIn2 = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
     

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
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
  test("It should add community to favorites", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .post("/community/add-to-favourites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);

    expect(response.body.message).toBe("Community added to favorites successfully");
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

    await request(app).post("/community/add-to-favourites").set("Authorization", `Bearer ${token}`).send({
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

    await request(app).post("/community/add-to-favourites").set("Authorization", `Bearer ${token}`).send({
      communityName: "farouqfans",
    });
    const response = await request(app)
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(200);
    expect(response.body.message).toBe("Community removed from favorites successfully");
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
      .post("/community/remove-favourite")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is not in favorites");
  });
});
/*
describe("Checking if community is favorite", () => {
  test("It should return true if community is favourite", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
    await request(app).post("/community/add-to-favourites").set("Authorization", `Bearer ${token}`).send({
      communityName: createdCommunity.name,
    });
    const response = await request(app)
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid parameters");
  });

  test("It should return false if community is not favorite", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .get("/community/is-favourite")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isFavourite).toBe(false);
  });

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
  });

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
  });
});
*/
describe("Muting community", () => {
  test("It should mute community", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
    await request(app).post("/community/mute").set("Authorization", `Bearer ${token}`).send({
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

    await request(app).post("/community/mute").set("Authorization", `Bearer ${token}`).send({
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
      .post("/community/unmute")
      .set("Authorization", `Bearer ${token}`)
      .send({
        communityName: "farouqfans",
      })
      .expect(402);

    expect(response.body.message).toBe("Community is not muted");
  });
});
/*
describe("Checking if community is muted", () => {
  test("It should return true if community is muted", async () => {
    
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
       await request(app).post("/community/mute").set("Authorization", `Bearer ${token}`).send({
      communityName: "farouqfans",
    });
    const response = await request(app)
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isMuted).toBe(true);
  });

  test("It should return false if community is not muted", async () => {
    
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isMuted).toBe(false);
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
    
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .get("/community/is-mute")
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
      .get("/community/is-mute")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "hello" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

*/
describe("Subscribing to community", () => {
  /*
  test("It should subscribe to the community successfully", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    await request(app).post("/community/create").set("Authorization", `Bearer ${token}`).send({
      name: "farouqfans",
      is18plus: true,
      communityType: "Public",
    });
    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.message).toBe("Subscribed to the community successfully");
  });
*/
  test("It should return 'Invalid parameters' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
  /*
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
     
    const token2 = logIn2.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Restricted",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
    const response = await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token2}`)
      .send({ communityName: "farouqfans" })
      .expect(403);

    expect(response.body.message).toBe("Restricted or Private community");
  });
*/
  test("It should return 'User is already subscribed' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
    await request(app)
      .post("/community/subscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" });

    const response = await request(app)
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.message).toBe("Unsubscribed from the community successfully");
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .post("/community/unsubscribe")
      .set("Authorization", `Bearer ${token}`)
      .send({ communityName: "farouqfans" })
      .expect(403);

    expect(response.body.message).toBe("User isn't subscribed to community");
  });
});
/*
describe("Checking if user is subscribed to a community", () => {
  test("It should return true if user is subscribed", async () => {
  
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
  });

  test("It should return false if user is not subscribed", async () => {
  
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body.isSubscribed).toBe(false);
  });

  test("It should return 'Invalid parameters' for status 400", async () => {
 
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

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
      .get("/community/is-subscribed")
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
      .get("/community/is-subscribed")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });
});

*/
/*
describe("Getting top communities", () => {
  test("It should return top public communities", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    await request(app).post("/community/create").set("Authorization", `Bearer ${token}`).send({
      name: "farouqfans",
      is18plus: true,
      communityType: "Public",
    });
    const response = await request(app)
      .get("/community/top-communities")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.communities).toBeDefined();
    expect(response.body.currentPage).toBeDefined();
    expect(response.body.totalPages).toBeDefined();
  });

  test("It should return 'No Public communities found' for status 404", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const response = await request(app)
      .get("/community/top-communities")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

    expect(response.body.message).toBe("No Public communities found");
  });
});
*/
/*
describe("Getting random category communities", () => {
  test("It should return random category communities", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
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
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    const response = await request(app)
      .get("/community/get-specific-category")
      .set("Authorization", `Bearer ${token}`)

      .query({ category: "football" })
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test("It should return 'No communities found for the specified category' for status 404", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    const response = await request(app)
      .get("/community/get-specific-category")
      .set("Authorization", `Bearer ${token}`)

      .query({ category: "helloo" })
      .expect(404);

    expect(response.body.message).toBe("No communities found for the specified category");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    const response = await request(app)
      .get("/community/get-specific-category")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });
});

describe("Getting community info", () => {
  test("It should return community info", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();

    const response = await request(app)
      .get("/community/get-info")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "farouqfans" })
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test("It should return 'Community not found' for status 404", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
    const response = await request(app)
      .get("/community/get-info")
      .set("Authorization", `Bearer ${token}`)
      .query({ communityName: "heloo" })
      .expect(404);

    expect(response.body.message).toBe("Community not found");
  });

  test("It should return 'Invalid request parameters' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
    const response = await request(app).get("/community/get-info").set("Authorization", `Bearer ${token}`).expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });
});
*/
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
        name: "farouqfans",
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
     

    const decodedToken = jwt.jwtDecode(token);
    const user = await User.findById(decodedToken._id);
    const createdCommunity = new Community({
      name: "farouqfans",
      is18plus: "true",
      communityType: "Public",
      category: "football",
      creator: user,
      moderators: [user],
    });
    await createdCommunity.save();
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
     

    const response = await request(app).post("/community/create").set("Authorization", `Bearer ${token}`).expect(400);

    expect(response.body.message).toBe("Invalid request parameters");
  });
});

////////////////////////////////////////////////////////////////////////
// GET USER INFO AND UPDATE USER INFO TESTS
////////////////////////////////////////////////////////////////////////
// Test suite for getting user profile info
describe("Getting user profile info", () => {
  test("It should return user profile info", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     

    const response = await request(app).get("/user/profile-info/farouquser").expect(200);

    expect(response.body).toBeDefined();
  });

  test("It should return 'User not found' for status 404", async () => {
    const response = await request(app).get("/user/profile-info/notfarouq").expect(404);
    expect(response.body.message).toBe("User not found");
  });
});
describe("Updating user profile info", () => {
  /*  test("It should update user profile info", async () => {
     
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
        avatar: "www.test.com",
        banner: "www.test.com",
        about: "New bio",
        username: "NEWWWW",
        isVisible: true,
        isActive: true,
      })
      .expect(200);

    expect(response.body).toBeDefined();
  });
*/
  test("It should return 'Username not available' for status 400", async () => {
     
    const logIn = await request(app).post("/login").send({
      username: "farouquser",
      password: "12345678",
    });
    const token = logIn.body.access_token;
     
     
    const logIn2 = await request(app).post("/login").send({
      username: "farouquser2",
      password: "12345678",
    });
     
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
