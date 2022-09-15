const bcrypt = require('bcryptjs');
const User = require('../models/User');



exports.login = async (req, res, next) => {

    const {email, password} = req.body;

    try {
        const userRequired = await User.find({email});
        if (userRequired.length > 0) {
            const match = await bcrypt.compare(password, userRequired[0].password);
            if (match) return res.status(200).send({
                _id:        userRequired[0]._id,
                fName:      userRequired[0].fName,
                lName:      userRequired[0].lName,
                avatar:     userRequired[0].avatar.length > 0 ? userRequired[0].avatar : null,
                email:      userRequired[0].email,
                joined:     userRequired[0].created
            });
            else return res.status(404).send('Wrong credentials.');
        }
        else {
            return res.status(404).send('Wrong credentials.');
        } 
    } 
    catch (error) {
        return res.status(500).send(error);
    }
}