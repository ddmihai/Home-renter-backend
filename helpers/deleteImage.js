const { cloudinary } = require('../connection/cloudinary');

module.exports = {
    deleteImage: async imageLink => {
        const publicId = 'home_renter/' + imageLink.split('.')[0];
        await cloudinary.uploader.destroy(publicId);    
    }
}