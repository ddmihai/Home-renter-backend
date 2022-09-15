const { uploadImage } = require('../helpers/uploadImage');
const House = require('../models/House.js');


exports.addHouseImage = async (req, res, next) => {
    
    try {
        const uploadFile = await uploadImage(req.body.image);
        await House.findByIdAndUpdate({_id: req.params._id}, { $push: {images: uploadFile}});
        return res.status(201).send('House image added successfully.');
    } 
    catch (error) {
        return res.status(500).send(error);
    }
}