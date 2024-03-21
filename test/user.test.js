const request = require("supertest");
const app = require("./testApp");
const mongoose = require("mongoose");
const config = require("../configuration");
const User = require("../models/user");
require("dotenv").config();

const connectionurl = config.testConnectionString;

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();


beforeAll(() => {
    mongoose.connect(
        connectionurl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (error, result) => {
            if (error) {
                throw error;
            }
        }
    );
});


afterAll(() => {
    mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany({});
    await notificationModel.deleteMany({});
    await Tweet.deleteMany({});
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();
    await new notificationModel(notificationOne).save();
    await new notificationModel(notificationTwo).save();
    await new Tweet(tweetOne).save();
    await new Tweet(tweetTwo).save();
});
