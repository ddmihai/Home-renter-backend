const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://daniel:windows@renting-house.mnuudu9.mongodb.net/test', 
() => console.log('Connected'),
er => console.log(er));

const House = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    number: {
        type: Number,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    postcode: {
        type: String,
        required: true,
        max: 7
    },

    description: {
        type: String,
        required: true,
    },

    images: [String],

    price: {
        type: Number,
        required: true,
    },

    typeOfTenancy: {
        type: String,
        enum: ['week', 'month']
    },

    addedTime: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('House', House);