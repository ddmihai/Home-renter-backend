const fs = require('fs');


module.exports = {
    deleteImage: (imageLink) => {
        const link = imageLink.split(3000)[1];
        console.log(imageLink);
        console.log(link);
        fs.unlinkSync('.' + link);
    }
}