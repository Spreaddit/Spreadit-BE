const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const jwt = require("jwt-decode");

const connectionUrl = "mongodb://localhost:27017/testDBforlisting";

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
  await Post.deleteMany({});
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /new", () => {
  test("It should get unauthorized 401", async () => {
    const signupResponse = await request(app).post("/signup").send({
      email: "amiraelgarf991234@gmail.com",
      username: "amira12amira",
      password: "12345678",
    });
    const usernameee = "amira12amira";

    await User.findOneAndUpdate({ username: usernameee }, { isVerified: true });

    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "amira12amira", password: "12345678" });

    const tokenlogin = loginResponse.body.access_token;

    const response = await request(app).get("/home/new").expect(401);
  });
});

// describe("get posts sorted by best", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/home/best").expect(404);
//   });
// });

// describe("get posts sorted by hotness", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/home/hot").expect(404);
//   });
// });

// describe("get posts sorted by time", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/home/new").expect(404);
//   });
// });

// describe("get posts sorted by votes", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/home/top").expect(404);
//   });
// });

describe("sort post by new", () => {
  test("It should sort by new", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by hot", () => {
  test("It should sort by hot", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by views", () => {
  test("It should sort by views", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/views")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by number of comments", () => {
  test("It should sort by number of comments", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/comments")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by ", () => {
  test("It should sort by best", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/best")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  // test("It should sort by hot", async () => {
  //   await request(app).post("/signup").send({
  //     email: "mahmoudaly@gmail.com",
  //     username: "mahmoud12",
  //     password: "12345678",
  //   });
  //   const logIn = await request(app).post("/login").send({
  //     username: "mahmoud12",
  //     password: "12345678",
  //   });
  //   const token = logIn.body.access_token;
  //   await User.findOneAndUpdate(
  //     { username: "mahmoud12" },
  //     { isVerified: true }
  //   );
  //   const newpost = new Post({
  //     userId: "jjhgd666",
  //     username: "mahmoud",
  //     title: "Test ",
  //     content: "",
  //     community: "mahmoud556",
  //     type: "Post",
  //     date: "2024-04-03T14:16:22.534+00:00",
  //   });
  //   await newpost.save();
  //   await request(app)
  //     .get("/home/api/top")
  //     .set("Authorization", `Bearer ${token}`)
  //     .expect(200);
  // });
});

describe("sort post by  hot in supspreadit", () => {
  test("It should sort by best", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/subspreadit/mahmoud556/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by new in community", () => {
  test("It should sort by best", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/subspreadit/mahmoud556/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("return unauthorized user ", () => {
  test("It should sort by best", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    const newpost = new Post({
      userId: "jjhgd666",
      username: "mahmoud",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app).get("/subspreadit/mahmoud556/new").expect(401);
  });
});

describe("sort post by new in community best if no posts found", () => {
  test("It should return 404 if no posts found", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    await request(app)
      .get("/subspreadit/mahmoud556/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in hot in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    await request(app)
      .get("/subspreadit/mahmoud556/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top in community", async () => {
    await request(app).post("/signup").send({
      email: "mahmoudaly@gmail.com",
      username: "mahmoud12",
      password: "12345678",
    });
    const logIn = await request(app).post("/login").send({
      username: "mahmoud12",
      password: "12345678",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate(
      { username: "mahmoud12" },
      { isVerified: true }
    );
    await request(app)
      .get("/subspreadit/mahmoud556/top")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});
// describe("get posts sorted by date in community", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/subspreadit/amira/new").expect(404);
//   });
// });

// describe("get posts sorted by top in community", () => {
//   test("It should return 404 if no posts found", async () => {
//     await request(app).get("/subspreadit/amira/top").expect(404);
//   });
// });
