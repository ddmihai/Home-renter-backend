const User = require('../models/User');


exports.edituser = async (req, res, next) => {
    const {fName, lName, email, userId} = req.body;

    try {
        await User.findByIdAndUpdate({_id: userId}, {fName, lName, email});
        const updatedUser = await User.findById({_id: userId});
        res.status(201).send({
            _id:        updatedUser._id,
            fName:      updatedUser.fName,
            lName:      updatedUser.lName,
            avatar:     updatedUser.avatar.length > 0 ? updatedUser.avatar : null,
            email:      updatedUser.email,
            joined:     updatedUser.created
        });
    } 
    catch (error) {
        res.status(500).send(error);
    }
}