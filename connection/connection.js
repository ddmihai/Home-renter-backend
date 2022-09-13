// Mongoose connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://daniel:windows@renting-house.mnuudu9.mongodb.net/test', 
() => console.log('Connected'),
er => console.log(er));

