const CreateCommunity = require('./../models/create-community');
const auth = require("../middleware/authentication");


exports.createNewCommunity = auth, async (req, res) => {

    const { name, description, rules } = req.body;
    //const creatorId = req.user.userName; 
    //i comment this line fornow untill know how to make it
    try {

    } catch (err) {

    }
};