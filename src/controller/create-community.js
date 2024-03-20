const Community = require('./../models/community');
const auth = require("../middleware/authentication");
const router = express.Router();

router.post("/", auth, this.createNewCommunity);

exports.createNewCommunity = async (req, res) => {

    const user = req.user;
    const { name, description, rules } = req.body;
    const createdCommunity = new Community({
        name: name,
        description: description,
        rules: rules,
        creator: user._id,
        members: [user._id]
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