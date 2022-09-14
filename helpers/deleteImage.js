const fs = require('fs');


module.exports = {
    deleteImage: (imageLink) => {
        const link = imageLink.split('com')[1];
        console.log(link);
        fs.unlinkSync(link);
    }
}