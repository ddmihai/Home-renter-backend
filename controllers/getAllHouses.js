const House = require('../models/House.js');


exports.getAllHouses = async (req, res, next) => {

    try {
        const housesList = await House.find();
        res.status(200).send(housesList);
    } 

    catch (error) {
        res.status(500).send(error);
    }
}