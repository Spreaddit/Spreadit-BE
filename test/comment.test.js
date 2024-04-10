const Comment = require("../src/models/comment");
const Post = require("../src/models/post");
const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../src/configuration");
const User = require("../src/models/user");

const connectionUrl = config.testConnectionString;


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
  
afterAll(() => {
    mongoose.connection.close();
});

id = new mongoose.Types.ObjectId();
id2 = new mongoose.Types.ObjectId();
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

const post ={
    _id: id2,
    userId: userTwoId,
    username: "elgarf",
    title: "this is a post",
    content: "this is the content of the post",
    community: "amira12amira",
    type: "Post"

}
const comment1 = {
    _id: id,
    userId:userOneId,
    postId: id2,
    username: "maher",
    content: "I am the first comment"
}

const comment2 = {
    username: "elgarf",
    userId: userTwoId,
    postId: id2,
    parentId: id,
    content: "I am the second comment"
}



const userOne = {
    _id: userOneId,
    name: "Mohamed Maher",
    username: "maher",
    email: "moahmedmaher4@gmail.com",
    password: "myPassw@ord123",
    followers: [userTwoId],
    followings: [userTwoId],
    gender: "Male",
    isVerified: true
}

const userTwo = {
    _id: userTwoId,
    name: "Amira Elgarf",
    username: "elgarf",
    birth_date: "1999-10-10T00:00:00.000Z",
    email: "elgarf@gmail.com",
    password: "TTFTTSTTD",
    followers: [userOneId],
    followings: [userOneId],
    gender: "Female",
    isVerified: true
}

const userThree = {
    _id: userThreeId,
    name: " Mahmoud Abbas",
    username: "abbas",
    birth_date: "1999-10-10T00:00:00.000Z",
    email: "abbas@gmail.com",
    password: "12345678",
    gender: "Male",
    isVerified: true
}

async function getUser(username_email) {
    const user = await User.find({
        $or: [{ email: username_email }, { username: username_email }],
    });
    if (user[0]) {
        return new User(user[0]);
    } else {
        return null;
    }
};
beforeEach(async () => {
    await User.deleteMany({});
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();
    await new Post(post).save();
    await Comment.deleteMany({});
    await new Comment(comment1).save();
    await new Comment(comment2).save();
    
});


test("posting a comment", async()=>{
    const signup = await request(app).post("/signup").send({
        email: "amiraelgarf99@gmail.com",
        username: "Aelgarf",
        password: "myPassw@ord123"
    }).expect(200);
    await User.findOneAndUpdate({ username: "Aelgarf" }, { isVerified: true });

    const login = await request(app)
        .post("/login")
        .send({ username: "Aelgarf", password: "myPassw@ord123" })
        .expect(200);

    const user = await getUser("Aelgarf");
    if (!user) {
        // Handle case where user is not found
        // For example:
        throw new Error("User not found");
    }
    const token = login.body.token;

    const response = await request(app)
    .post('/post/comment/' + id2)
    .set("Authorization", "Bearer " + user.tokens[0].token)
    .send({
        content: "this is a new comment"
    })
    .expect(200);
})

  