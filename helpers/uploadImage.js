const { cloudinary } = require('../connection/cloudinary');


module.exports = {
    uploadImage: async imageLink => {
        const uploadFiles = await cloudinary.uploader.upload(imageLink, {
        folder: 'home_renter', 
        upload_preset: 'ml_default'});

        return uploadFiles.url;
    }
};


