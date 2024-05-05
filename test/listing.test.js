const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const jwt = require("jwt-decode");

const connectionUrl = "mongodb://localhost:27017/testDBforlisting";
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "myPassw@ord123",
  gender: "Male",
  isVerified: true,
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
  await new User(userOne).save();
  await Post.deleteMany({});
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /new", () => {
  test("It should get unauthorized 401", async () => {
    const usernameee = "maher";

    await User.findOneAndUpdate({ username: usernameee }, { isVerified: true });

    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "maher", password: "myPassw@ord123" });

    const tokenlogin = loginResponse.body.access_token;

    const response = await request(app).get("/home/new").expect(401);
  });
});

// describe("get posts sorted by top", () => {
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
  //     username: "maher",
  //     password: "12345678",
  //   });
  //   const logIn = await request(app).post("/login").send({
  //     username: "maher",
  //     password: "12345678",
  //   });
  //   const token = logIn.body.access_token;
  //   await User.findOneAndUpdate(
  //     { username: "maher" },
  //     { isVerified: true }
  //   );
  //   const newpost = new Post({
  //     userId: userOneId,
  //     username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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

describe("It should sort by best ", () => {
  test("It should sort by best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
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
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/mahmoud556/new")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in hot in community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/mahmoud556/hot")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top in community", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/subspreadit/mahmoud556/top")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in best", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/best")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top now", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top/now")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top today", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top/day")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top month", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top week", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top/week")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in top year", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in sorting by comments", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/comments")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("It should return 404 if no posts found in sorting by views", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    await request(app)
      .get("/home/views")
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

// describe("sort post by top in community now", () => {
//   test("It should sort by top", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/subspreadit/mahmoud556/top/now")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top in community day", () => {
//   test("It should sort by top", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/subspreadit/mahmoud556/top/day")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top in community week", () => {
//   test("It should sort by top", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/subspreadit/mahmoud556/top/week")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top in community month", () => {
//   test("It should sort by top", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/subspreadit/mahmoud556/top/month")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top in community year", () => {
//   test("It should sort by top", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/subspreadit/mahmoud556/top/year")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top now", () => {
//   test("It should sort by top now", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/home/top/now")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top now", () => {
//   test("It should sort by top now", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/home/top/day")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top now", () => {
//   test("It should sort by top now", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/home/top/now")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top day", () => {
//   test("It should sort by top day", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/home/top/now")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

// describe("sort post by top week", () => {
//   test("It should sort by top week", async () => {
//     await request(app).post("/signup").send({
//       email: "mahmoudaly@gmail.com",
//       username: "maher",
//       password: "12345678",
//     });
//     const logIn = await request(app).post("/login").send({
//       username: "maher",
//       password: "12345678",
//     });
//     const token = logIn.body.access_token;
//     await User.findOneAndUpdate(
//       { username: "maher" },
//       { isVerified: true }
//     );
//     const newpost = new Post({
//       userId: userOneId,
//       username: "maher",
//       title: "Test ",
//       content: "",
//       community: "mahmoud556",
//       type: "Post",
//       date: "2024-04-03T14:16:22.534+00:00",
//     });
//     await newpost.save();
//     await request(app)
//       .get("/home/top/week")
//       .set("Authorization", `Bearer ${token}`)
//       .expect(200);
//   });
// });

describe("sort post by top month", () => {
  test("It should sort by top month", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/top/month")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by top year", () => {
  test("It should sort by top year", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/top/year")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("sort post by recent", () => {
  test("It should sort by recent", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/home/recentposts")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("sort post by random in community ", () => {
  test("It should sort by top", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    await User.findOneAndUpdate({ username: "maher" }, { isVerified: true });
    const newpost = new Post({
      userId: userOneId,
      username: "maher",
      title: "Test ",
      content: "",
      community: "mahmoud556",
      type: "Post",
      date: "2024-04-03T14:16:22.534+00:00",
    });
    await newpost.save();
    await request(app)
      .get("/subspreadit/mahmoud556/random")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
