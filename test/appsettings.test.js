const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = config.testConnectionString;
let token;

beforeAll(async () => {
  try {
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Mongoose connection error:', error);
  }
});


beforeEach(async () => {
    await User.deleteMany({});
    const signupResponse = await request(app)
      .post("/signup")
      .send({
        email: "faroukdiaa52@gmail.com",
        username: "farouq123",
        password: "12345678",
      });
    const loginResponse = await request(app)
     .post("/login")
     .send({
        username: "farouq123",
        password: "12345678",
      });
      token = loginResponse.body.access_token;
      
  }, 10000); 



describe("Feed Settings", () => {
  describe("GET /feed", () => {
    test("should return feed settings for a user", async () => {
      const response = await request(app)
        .get("/feed")
        .send({ token })
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({
            adultContent: 0,
            autoplayMedia: 1,
            communityThemes: 1,
            communityContentSort: "Hot",
            globalContentView: "Card",
            openPostsInNewTab: 0
      }));
    });

//     test("should return error if token is missing", async () => {
//       // Make a GET request without a token
//       const response = await request(app)
//         .get("/feed-settings/feed")
//         .expect(400);

//       // Assert that the response contains the expected error message
//       expect(response.body).toEqual(expect.objectContaining({
//         error: "User ID is required"
//       }));
//     });
//   });

//   describe("PUT /feed-settings", () => {
//     test("should modify feed settings for a user", async () => {
//       // Mock user token
//       const token = jwt.sign({ _id: "user_id_here" }, "secret_key_here");

//       // Mock feed setting data to update
//       const feedSettingData = {
//         // Add your mock feed setting data to update here
//       };

//       // Save mock feed setting data to the database
//       await User.create({
//         _id: "user_id_here",
//         // Add your initial feed setting data here
//       });

//       // Make a PUT request to modify feed settings
//       const response = await request(app)
//         .put("/feed-settings/feed")
//         .set('Authorization', `Bearer ${token}`)
//         .send(feedSettingData)
//         .expect(200);

//       // Assert that the response contains the success message
//       expect(response.body).toEqual(expect.objectContaining({
//         message: "success"
//       }));

//       // Fetch the updated feed settings from the database
//       const updatedUser = await User.findOne({ _id: "user_id_here" });

//       // Assert that the feed settings have been updated correctly
//       expect(updatedUser.feedSettings).toEqual(expect.objectContaining(feedSettingData));
//     });

//     test("should return error if token is missing", async () => {
//       // Make a PUT request without a token
//       const response = await request(app)
//         .put("/feed-settings/feed")
//         .expect(400);

//       // Assert that the response contains the expected error message
//       expect(response.body).toEqual(expect.objectContaining({
//         error: "User ID is required"
//       }));
//     });
  });
});
