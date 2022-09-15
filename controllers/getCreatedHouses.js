const House = require('../models/House.js');


exports.getCreatedHouses = async (req, res, next) => {

    try {
        const requiredHouses = await House.find({author: req.params._id});
        requiredHouses.length > 0 
        ? res.status(201).send(requiredHouses) 
        : res.status(404).send('No houses created yet.');
    } 
    catch (error) {
        if (error.name === 'CastError') 
            return res.status(500).send('There are some errors with your query. Please make sure the details are written correctly');
        else
            return res.status(500).send(error);
    }
}