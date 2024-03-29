const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");
const bcrypt = require("bcryptjs");
const { blockUser } = require("../src/controller/block-user");
const BlockUser = require("../src/models/user");
const jwt = require("jsonwebtoken");
const connectionurl = config.testConnectionString;

// Mock dependencies
jest.mock("../src/models/user");
jest.mock("jsonwebtoken");

describe("blockUser function", () => {
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
    BlockUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userToBlockId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "blockerId" });
    BlockUser.findByIdAndUpdate.mockResolvedValueOnce({});

    // Call the function
    await blockUser(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Username is required",
    });
  });

  it("should block user successfully", async () => {
    // Mock req and res objects
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

    // Mock functions to return desired values
    BlockUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userToBlockId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "blockerId" });
    BlockUser.findByIdAndUpdate.mockResolvedValueOnce({});

    // Call the function
    await blockUser(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      description: "User blocked successfully",
    });
  });

  it("should return error if there is no token", async () => {
    // Mock req and res objects
    const req = {
      body: {
        username: "userToBlock",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock functions to return desired values
    BlockUser.getUserByEmailOrUsername.mockResolvedValueOnce({
      _id: "userToBlockId",
    });
    jwt.decode.mockReturnValueOnce({ _id: "blockerId" });
    BlockUser.findByIdAndUpdate.mockResolvedValueOnce({});

    await blockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "please login first",
    });
  });
});
