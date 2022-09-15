const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Home page render for Heroku
app.get('/', (req, res, next) => res.send('Wellcome to home renter'));

// Controllers importing
const { signup } = require('./controllers/signup');
const { addAvatar } = require('./controllers/addAvatar');
const { login } = require('./controllers/login');
const { getUserById } = require('./controllers/getUserById');
const { edituser } = require('./controllers/editUser');
const { getAllHouses } = require('./controllers/getAllHouses');
const { createHouse } = require('./controllers/createHouse');
const { editHouse } = require('./controllers/editHouse');
const { getHouseById } = require('./controllers/getHouseById');
const { getCreatedHouses } = require('./controllers/getCreatedHouses');
const { addHouseImage } = require('./controllers/addHouseImage');
const { deleteHouse } = require('./controllers/deleteHouse');


app.post('/api/signup', signup);
app.post('/api/login', login);
app.post('/api/add-avatar/:_id', addAvatar);
app.post('/api/create-house', createHouse);



// Get controllers
app.get('/api/get-user/:_id', getUserById);
app.get('/api/get-all-houses', getAllHouses);
app.get('/api/get-house-by-id/:_id', getHouseById);
app.get('/api/get-created-houses/:_id', getCreatedHouses);


// Put controllers
app.put('/api/edit-user', edituser);
app.put('/api/update-house/:_id', editHouse);
app.put('/api/add-image/:_id', addHouseImage);



// Delete
app.delete('/api/delete-house/:_id', deleteHouse);









module.exports = app;



