const House = require('../models/House.js');


exports.createHouse = async (req, res, next) => {
    const { author, number, street, city, postcode, description, price, typeOfTenancy } = req.body;

    try {
        const house = await House.create({author, number, street, city, postcode, description, price, typeOfTenancy});
        res.status(201).send(house);
    } 
    catch (error) {
        res.status(500).send(error);
    }
}