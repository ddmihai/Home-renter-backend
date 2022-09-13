const fs = require('fs');


module.exports = {
    deleteImage: (imageLink) => {
        const link = imageLink.split(3000)[1];
        fs.unlinkSync('.' + link);
    }
}