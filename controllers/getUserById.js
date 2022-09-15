const User = require('../models/User');


exports.getUserById = async (req, res, next) => {

    try {
        const user = await User.find({_id: req.params._id});
        res.status(200).send({
            _id:        user[0]._id,
            fName:      user[0].fName,
            lName:      user[0].lName,
            email:      user[0].email,
            joined:     user[0].created,
            avatar:     user[0].avatar
        });
    } 
    catch (error) {
        res.status(500).send(error);
    }
}