const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://daniel:windows@renting-house.mnuudu9.mongodb.net/test', 
() => console.log('Connected'),
er => console.log(er));




const UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        trim: true,
        required: [true, 'First name should be provided']
    },

    lName: {
        type: String,
        trim: true,
        required: [true, 'Last name should be provided']
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email should be provided'],
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password should not be empty'],
        min: 7
    }, 

    created: {
        type: Date,
        default: Date.now()
    },

    avatar: String
});

module.exports = mongoose.model('User', UserSchema);