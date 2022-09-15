const House = require('../models/House.js');


exports.getHouseById = async (req, res, next) => {

    try {
        const house = await House.find({_id: req.params._id});
        return res.status(200).send(house[0]);
    } 
    catch (error) {
        return res.status(500).send(error);
    }
}