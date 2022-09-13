const multer = require('multer');
const path = require('path');
const uuid = require('uuid');


const storage = multer.diskStorage({
    destination: `./images`,
    filename: (req, file, cb) => {
        // Filename is to be exact datetime and the original file extension
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const uploadImage = multer({storage}).single('file');


module.exports = uploadImage;
