
const bcrypt = require('bcrypt');

exports.hash = async plainPassword => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);    
    } 
    catch (error) {
        return error;
    }
}