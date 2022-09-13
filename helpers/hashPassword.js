
const bcrypt = require('bcryptjs');

exports.hash = async plainPassword => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(plainPassword, salt);    
    } 
    catch (error) {
        return error;
    }
}