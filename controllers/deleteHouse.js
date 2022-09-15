const House = require('../models/House.js');
const { deleteImage } = require('../helpers/deleteImage.js');


exports.deleteHouse = async (req, res, next) => {

    // Get the book that needs to be deleted
    // If the book contains one or more images, delete first the images and than delete the database record
    try {
        const house = await House.find({_id: req.params._id});
        if (house[0].images.length >= 1) {
            house[0].images.map(async image => {
                const imageLink = image.split('home_renter/')[1];
                deleteImage(imageLink);
                await House.findByIdAndDelete(req.params._id);
            });
            return res.status(201).send('Deleted.');
        }
        else if (house[0].images.length === 0) {
            await House.findByIdAndDelete(req.params._id);
            return res.status(201).send('Deleted.');
        }
    } 
    catch (error) {
        return res.status(500).send(error);
    }
}