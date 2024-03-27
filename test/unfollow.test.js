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

// Mock dependencies
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
    jest.clearAllMocks(); // Clear mocks after each test
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should return error if there is no username", async () => {
    // Mock req and res objects
    const req = {
      body: {
        token: "mocktoken",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock functions to return desired values
    UnFollowUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userTounfollowId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "unfollowerId" });
    UnFollowUser.findByIdAndUpdate.mockResolvedValueOnce({});

    // Call the function
    await unfollowUser(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Username is required",
    });
  });

  it("should return error if there is no token", async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: "userTounfollow",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock functions to return desired values
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
