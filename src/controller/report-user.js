const FollowUser = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

exports.router.route("/:id").post(auth, this.followUser);

exports.followUser = async (req, res) => {
  //const user = req.user;

  try {
    const toFollowUser = req.body;
    const { toFollowID } = toFollowUser;
    console.log("Searching for user with ID:", toFollowID);
    const follower = await FollowUser.findById(toFollowID);
    if (!follower) {
      console.error("this user not found:");
      return res.status(404).json({ error: "User not found" });
    }
    const user = req.user;
    const { followingID } = user;
    const following = await FollowUser.findById(followingID);
    if (!following) {
      console.error("please login first:");
      return res.status(404).json({ error: "User not found" });
    }
    following.followings.push(toFollowID);
    follower.followers.push(followingID);

    const response = {
      status: "success",
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error follow user", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.followUser = async (req, res) => {
//   //const user = req.user;

//   try {
//     const toFollowUser = req.body;
//     const { toFollowID } = toFollowUser;
//     console.log("Searching for user with ID:", toFollowID);
//     const follower = await FollowUser.findOne({_id: toFollowID });
//     if (!follower) {
//       console.error("this user not found:");
//       return res.status(404).json({ error: "User not found" });
//     }

//     router.post("/user/follow", auth, async (req, res) => {
//       const user = req.user;
//       const { followingID } = user;
//       const following = await FollowUser.findOne({ _id: followingID });
//       if (!following) {
//         console.error("please login first:");
//         return res.status(404).json({ error: "User not found" });
//       }
//       following.followings.push(toFollowID);
//       follower.followers.push(followingID);

//       const response = {

//     };
//     res.status(200).json(response);

//     });

//   } catch (err) {
//     console.error("Error follow user", err);
//     res.status(500).json({ error: "Internal server error" });
//   }

// }
