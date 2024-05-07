const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const bcrypt = require("bcryptjs");
const { unfollowUser } = require("../src/controller/unfollow-user");
const UnFollowUser = require("../src/models/user");
const jwt = require("jsonwebtoken");
const connectionurl = config.testConnectionString;

jest.mock("../src/models/user");
jest.mock("jsonwebtoken");

describe("unFollowUser function", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(connectionurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.error("Mongoose connection error:", error);
    }
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should return error if there is no username", async () => {
    const req = {
      body: {
        token: "mocktoken",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UnFollowUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userTounfollowId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "unfollowerId" });
    UnFollowUser.findByIdAndUpdate.mockResolvedValueOnce({});

    await unfollowUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Username is required",
    });
  });

  it("should return error if there is no username", async () => {
    const req = {
      body: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA0NTM5NDkwNjVjNDE1ZjdiMjc1MTAiLCJ1c2VybmFtZSI6Im1haG1vdWQxMiIsImlhdCI6MTcxMTU1OTU3Mn0.qK9YHlpsxYJs1DEOyha96hP2MLoScWf3TVr51cQ7Jx0",
        username: "amira12",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UnFollowUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userTounfollowId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "unfollowerId" });
    UnFollowUser.findByIdAndUpdate.mockResolvedValueOnce({});

    await unfollowUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      description: "User unfollowed successfully",
    });
  });

  it("should return error if there is no token", async () => {
    const req = {
      body: {
        username: "userTounfollow",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    UnFollowUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userTounfollowId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "unfollowerId" });
    UnFollowUser.findByIdAndUpdate.mockResolvedValueOnce({});

    await unfollowUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "please login first",
    });
  });
});
