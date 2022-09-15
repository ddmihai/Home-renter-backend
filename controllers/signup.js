const hash = require('../helpers/hashPassword.js');
const User = require('../models/User');


exports.signup = async (req, res, next) => {
    const {fName, lName, avatar, email, password} = req.body;

    try {
        const hashPass = await hash.hash(password);
        await User.create({fName, lName, email, avatar, password: hashPass});
        res.status(201).send('User created.');
    } 
    catch (error) {
        if (error.code === 11000)
            return res.status(500).send('Please chose another email.');
        else
            return res.status(500).send(error);
    }
}