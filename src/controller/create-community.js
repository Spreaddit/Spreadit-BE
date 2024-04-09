const Community = require('./../models/community');
const auth = require("../middleware/authentication");
const express = require('express');
const jwt = require("jsonwebtoken");



exports.createNewCommunity = async (req, res) => {

    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const decodeToken = jwt.decode(token);
    const user = decodeToken._id;
    const { name, is18plus, communityType, category } = req.body;
    const createdCommunity = new Community({
        name: name,
        is18plus: is18plus,
        communityType: communityType,
        creator: user,
        members: [user],
        moderators: [user]
    });

    try {

        const savedCommunity = await createdCommunity.save();
        console.log('Community created successfully');

        return res.status(200).send({ status: 'success' });

    } catch (err) {

        if (err.name == "ValidationError") {
            res.status(400).send(err.toString());
        } else {
            console.error('Error creating the community: ', err);
            res.status(500).send(err.toString());
        }

    }
};