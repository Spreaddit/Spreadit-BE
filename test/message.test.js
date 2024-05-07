const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const jwt = require("jwt-decode");
const Message = require("../src/models/message");
const Conversation = require("../src/models/conversation");
const connectionUrl = "mongodb://localhost:27017/testDBformessage";
const userOneId = new mongoose.Types.ObjectId("624a4a94c66738f13854b474");
const userTwoId = new mongoose.Types.ObjectId("624a4a94c66738f13854b475");
const userOne = {
  _id: userOneId,
  name: "Mohamed Maher",
  username: "maher",
  email: "moahmedmaher4@gmail.com",
  password: "myPassw@ord123",
  gender: "Male",
  isVerified: true,
};
const userTwo = {
  _id: userTwoId,
  name: "mahmoud aly",
  username: "mahmoud",
  email: "mahmoud66@gmail.com",
  password: "12345678",
  gender: "Male",
  isVerified: true,
};

beforeAll(async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Message.deleteMany({});
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
});

beforeEach(async () => {
  await User.deleteMany({});
  await User(userOne).save();
  await User(userTwo).save();
}, 10000);
afterEach(async () => {
  await User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
});

describe("send messages", () => {
  test("It send  message", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "what is the best club in the world",
        subject: "football",
      })
      .expect(201);
  });
});

describe("send messages", () => {
  test("user cannot message himself", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "maher",
        content: "what is the best club in the world",
        subject: "football",
      })
      .expect(400);
  });
});

describe("send messages", () => {
  test("It send  message", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });
    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "what is the best club in the world",
        subject: "football",
      })
      .expect(400);
  });
});
describe("send messages", () => {
  test("It should returm bad request username not found", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",

        subject: "football",
      })
      .expect(400);
  });
});
describe("send messages", () => {
  test("It should returm bad request subject not found", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "what is the best club in the world",
      })
      .expect(400);
  });
});
describe("send messages", () => {
  test("It should returm bad request subject not found", async () => {
    const logIn = await request(app).post("/login").send({
      username: "maher",
      password: "myPassw@ord123",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/compose")
      .set("Authorization", `Bearer `)
      .send({
        username: "mahmoud",
        content: "what is the best club in the world",
      })
      .expect(401);
  });
});

test("It should returm bad request content not found", async () => {
  const logIn = await request(app).post("/login").send({
    username: "maher",
    password: "myPassw@ord123",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "maher" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .post(`/message/reply/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(403);
});

describe("reply messages", () => {
  test("It send  message", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/reply/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(201);
  });

  test("It send  message", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/reply/66376d9547d46195ad293111")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(404);
  });
});

describe("reply messages", () => {
  test("it send 400 content not found", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/reply/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        subject: "football",
      })
      .expect(400);
  });
});

test("it send 401 unauthorized", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "maher" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .post(`/message/reply/${id}`)
    .set("Authorization", `Bearer `)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(401);
});

describe("get inbox messages", () => {
  test("it get inbox messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/inbox/")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("get inbox messages", () => {
  test("It get inbox messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "mahmoud" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/inbox/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(200);
  });
});

describe("get sent messages", () => {
  test("It get sent messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "mahmoud" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/sent/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(200);
  });
});

describe("get inbox messages", () => {
  test("it get inbox messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/sent/")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("get all messages", () => {
  test("It get all messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "mahmoud" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/messages/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(200);
  });
});

describe("get all messages", () => {
  test("it get all messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/messages/")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

test("It get unread messages", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  await request(app)
    .get("/message/unread/")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(200);
});

describe("get unread messages", () => {
  test("it get unread messages", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .get("/message/unread/")
      .set("Authorization", `Bearer `)
      .expect(401);
  });
});

describe("read messages", () => {
  test("It should mark message as read", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/readmsg/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(201);
  });

  test("It should mark message as read", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/readmsg/66376d9547d46195ad293111")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(404);
  });
});

describe("read messages", () => {
  test("It shouldsend 401 unautorized", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/readmsg/${id}`)
      .set("Authorization", `Bearer `)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(401);
  });
});

describe("unread messages", () => {
  test("It should mark message as read", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/unreadmsg/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(201);
  });

  test("It should mark message as read", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    await request(app)
      .post("/message/unreadmsg/66376d9547d46195ad293111")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(404);
  });
});

describe("unread messages", () => {
  test("It should send 401 unautorized", async () => {
    const logIn = await request(app).post("/login").send({
      username: "mahmoud",
      password: "12345678",
    });

    const token = logIn.body.access_token;
    const newUser = await User.findOneAndUpdate(
      { username: "maher" },
      { isVerified: true }
    );
    const message = await Message.findOne({ senderId: userOneId });
    const id = message._id.toString();
    await request(app)
      .post(`/message/unreadmsg/${id}`)
      .set("Authorization", `Bearer `)
      .send({
        username: "mahmoud",
        content: "real madrid",
        subject: "football",
      })
      .expect(401);
  });
});

test("It get  message by id", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .get(`/message/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(200);
});

test("It get  message by id", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .get(`/message/${id}`)
    .set("Authorization", `Bearer `)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(401);
});

test("It get  message by id", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  await request(app)
    .get("/message/66376d9547d461958d2936d8")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: "mahmoud",
      content: "real madrid",
      subject: "football",
    })
    .expect(404);
});

test("It should report message", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "maher" },
    { isVerified: true }
  );
  await request(app)
    .post("/message/reportmsg/66376d9547d46195ad293111")
    .set("Authorization", `Bearer ${token}`)
    .send({
      reason: "spam",
      subreason: "comment",
    })
    .expect(404);
});

test("It   report message", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .post(`/message/reportmsg/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      reason: "spam",
      subreason: "comment",
    })
    .expect(200);
});

test("It   report message", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .post(`/message/reportmsg/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      reason: "spam",
    })
    .expect(400);
});

test("It   report message", async () => {
  const logIn = await request(app).post("/login").send({
    username: "mahmoud",
    password: "12345678",
  });

  const token = logIn.body.access_token;
  const newUser = await User.findOneAndUpdate(
    { username: "mahmoud" },
    { isVerified: true }
  );
  const message = await Message.findOne({ senderId: userOneId });
  const id = message._id.toString();
  await request(app)
    .post(`/message/reportmsg/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      subreason: "comment",
    })
    .expect(400);
});
