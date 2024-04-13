//begin post
const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = "mongodb://localhost:27017/testDBforSettings";

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
}, 10000);

afterAll(() => {
    mongoose.connection.close();
});



describe("POST /api/posts", () => {
    test("It should create a new post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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


        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };

        const response = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);

    });

});

describe("GET /api/posts", () => {
    test("It should retrieve all posts", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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

        const response = await request(app)
            .get("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(404);

    });
});

describe("GET /api/posts/:id", () => {

    test("It should return 404 if post is not found", async () => {
        await request(app)
            .get("/api/posts/123456789012345678901234") // Invalid ID
            .expect(404);
    });
});

describe("PUT /api/posts/:id", () => {

    test("It should return 404 if post is not found", async () => {
        await request(app)
            .put("/api/posts/123456789012345678901234") // Invalid ID
            .expect(404);
    });
});

describe("DELETE /api/posts/:id", () => {

    test("It should return 404 if post is not found", async () => {
        await request(app)
            .delete("/api/posts/123456789012345678901234") // Invalid ID
            .expect(404);
    });
});

describe("GET saved posts", () => {
    test("It should retrieve all saved posts", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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

        const response = await request(app)
            .get("/:postId/save")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(404);

    });
});

describe(" save post", () => {
    test("It should save post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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

        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };

        const response2 = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);
        console.log(response2.body);
        const postId = response2.body.postId;
        console.log(postId);

        const response = await request(app)
            .post(`/${postId}/save`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);

    });
});

describe(" unsave post", () => {
    test("It should unsave post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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

        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };

        const response2 = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);
        const postId = response2.body.postId;


        const response3 = await request(app)
            .post(`/${postId}/save`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);
        const response4 = await request(app)
            .post(`/${postId}/unsave`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);

    });
});

describe(" unsave post", () => {
    test("It should unsave post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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

        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };

        const response2 = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);
        console.log(response2.body);
        const postId = response2.body.postId;
        console.log(postId);

        const response4 = await request(app)
            .post(`/${postId}/unsave`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(400);

    });
});

describe("spoiler a post", () => {
    test("It should spoiler  post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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


        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };
        const response2 = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);
        const postId = response2.body.postId;


        const response3 = await request(app)
            .post(`/${postId}/spoiler`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);

    });

});

describe("unspoiler a post", () => {
    test("It should unspoiler  post", async () => {
        const signupResponse = await request(app)
            .post("/signup")
            .send({
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


        const newPost = {
            title: "Test Post",
            content: "This is a test post.",
            community: "amira12amira",
            type: "Post",
        };
        const response2 = await request(app)
            .post("/")
            .set("Authorization", `Bearer ${tokenlogin}`)
            .send(newPost)
            .expect(201);
        const postId = response2.body.postId;


        const response3 = await request(app)
            .post(`/${postId}/spoiler`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);
        const response4 = await request(app)
            .post(`/${postId}/unspoiler`)
            .set("Authorization", `Bearer ${tokenlogin}`)
            .expect(200);

    });

});

