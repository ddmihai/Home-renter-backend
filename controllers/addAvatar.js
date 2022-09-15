const User = require('../models/User');
const { deleteImage } = require('../helpers/deleteImage.js');
const { uploadImage } = require('../helpers/uploadImage.js');


/**
 *  Find the user required. If the user have an avatar, delete the old one from the server and upload the new avatar. 
 *  If the user do not have an avatar, just upload the avatar on server and on DB
*/
exports.addAvatar = async (req, res, next) => {

    try {

        // If the user have an avatar, delete from the cloudinary cloud 
        const requiredUser = await User.find({_id: req.params._id});
        if (requiredUser[0].avatar.length > 0) {
            const imageLink = requiredUser[0].avatar.split('home_renter/')[1];
            deleteImage(imageLink);
        }

        // Start the upload process
        const uploadFile = await uploadImage(req.body.image);             
        await User.findByIdAndUpdate({_id: req.params._id}, {avatar: uploadFile});
        return res.status(201).send('Image uploaded.');

    } catch (error) {
        if (error.message === 'File size too large. Got 12783697. Maximum is 10485760.')
            return res.status(500).send('The file is too large..')
        else 
            return res.status(500).send(error);
    }
}