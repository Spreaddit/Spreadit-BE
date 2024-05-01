const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../src/routes/community-comment.js'); 
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import your models and controllers for testing
const Post = require("../models/post");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");
const Report = require("../models/report.js");
const Community = require("../models/community.js");
const Moderator = require("../models/moderator.js");
const userRole = require('./constants/userRole');
const Rule = require('../src/models/rule.js');


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



const AdminId = "6240cb6a412efa3d5d89c0af";
id = new mongoose.Types.ObjectId();
id2 = new mongoose.Types.ObjectId();
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

const admin = {
    _id: AdminId,
    name: "Mohamed Maher",
    username: "maher",
    email: "moahmedmaher4@gmail.com",
    password: "myPassw@ord123",
    gender: "Male",
    roleId: userRole.adminRole._id,
    isVerified: true
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
const rule ={
    _id: "624a6a677c8d9c9f5fd5eb35",
    title: "test Community Guidelines",
    description: "1. Respect the privacy and emotions of members when discussing mental health issues.",
    reportReason: "Violation of community guidelines",
    communityName: "testCommunity",
}
const community ={

    _id: id,
    name: "testCommunity",
    category: "Entertainment and Pop Culture",
    rules: [id2], 
    description: "Discuss the latest movie releases, share reviews, recommendations, and indulge in lively debates about classic films.",
    is18plus: false,
    allowNfsw: true,
    allowSpoile: true,
    communityType: "Public",
    creator: userOneId, 
    members: [userOneId, userTwoId, userThreeId],
    moderators: [userOneId], 
    membersCount: 3,
}

const moderator ={
    username: "maher", 
    communityName: "testCommunity",  
}

beforeEach(async () => {
    await User.deleteMany({});
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();
    await new User(admin).save();
    await Community.deleteMany({});
    await new Community(community).save();
    await Moderator.deleteMany({});
    await new Community(moderator).save();
    await Rule.deleteMany({});
    await new Rule(rule).save();
});

