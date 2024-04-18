const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const Post = require("./../models/post");
const Comment = require("./../models/comment");


//when the user changes his username it should be updated in the posts as well 

router.get("/vapid-key", auth, async (req, res) => {
    try {
      const vapidKeys = webPush.generateVAPIDKeys();
      if (vapidKeys) {
        return res.status(200).send({
          publicKey: vapidKeys.publicKey,
          privateKey: vapidKeys.privateKey,
        });
      } else {
        return res.status(500).send({
          message: "Vapid keys could not be generated",
        });
      }
    } catch (error) {
      res.status(500).send(error.toString());
    }
});