const House = require('../models/House.js');


exports.editHouse = async (req, res, next) => {
    const { number, street, city, postcode, description, price, typeOfTenancy } = req.body;

    try {
        await House.findByIdAndUpdate({_id: req.params._id}, 
            {number, street, city, postcode, description, price, typeOfTenancy});
        return res.status(201).send('Updated');
    } 
    catch (error) {
        return res.status(500).send(error);
    }
}