const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Static files
const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')));


app.get('/', (req, res, next) => res.send('Wellcome to home renter'));



app.post('/api/signup', async (req, res, next) => {
    const hash = require('./helpers/hashPassword.js');
    const User = require('./models/User');
    const {fName, lName, avatar, email, password} = req.body;

    try {
        const hashPass = await hash.hash(password);
        await User.create({fName, lName, email, avatar, password: hashPass});
        res.status(201).send('User created.');
    } 
    catch (error) {
        if (error.code === 11000)
            return res.status(500).send('Please chose another email.');
        else
            return res.status(500).send(error);
    }
});





// Add avatar
const multer = require('./middleware/multer.js');
/**
 *  Find the user required. If the user have an avatar, delete the old one from the server and upload the new avatar. 
 *  If the user do not have an avatar, just upload the avatar on server and on DB
*/
app.post('/api/add-avatar/:_id', multer, async (req, res, next) => {
    // Movve this to the start of the page
    const User = require('./models/User');
    const { deleteImage } = require('./helpers/deleteImage.js');

    // Build the image path
    const file = req.file ? 
    req.protocol + '://' + req.get('host') + '/' + req.file.path 
    : null;

    if (file) {
        try {
            const userRequired = await User.findById({_id: req.params._id});
            if (userRequired.avatar.length === 0) {
                await User.findByIdAndUpdate({_id: req.params._id}, {avatar: file});
                return res.status(201).send('Image uploaded.');
            }
            else {
                await User.findByIdAndUpdate({_id: req.params._id}, {avatar: file});
                deleteImage(userRequired.avatar);
                return res.status(201).send('Image uploaded.');
            }
        } 
        catch (error) {
            return res.status(500).send(error);
        }
    }

    // If no file was selected...
    else return res.status(304).send('No avatar uploaded.');
});



// Login
app.post('/api/login', async (req, res, next) => {
    // Move this on top of pagee
    const bcrypt = require('bcryptjs');
    const User = require('./models/User');

    const {email, password} = req.body;

    try {
        const userRequired = await User.find({email});
        if (userRequired.length > 0) {
            const match = await bcrypt.compare(password, userRequired[0].password);
            if (match) return res.status(200).send({
                _id:        userRequired[0]._id,
                fName:      userRequired[0].fName,
                lName:      userRequired[0].lName,
                avatar:     userRequired[0].avatar.length > 0 ? userRequired[0].avatar : null,
                email:      userRequired[0].email,
                joined:     userRequired[0].created
            });
            else return res.status(404).send('Wrong credentials.');
        }
        else {
            return res.status(404).send('Wrong credentials.');
        } 
    } 
    catch (error) {
        return res.status(500).send(error);
    }
});



// Get user by _id
app.get('/api/get-user/:_id', async (req, res, next) => {
    const User = require('./models/User');

    try {
        const user = await User.find({_id: req.params._id});
        res.status(200).send({
            _id:        user[0]._id,
            fName:      user[0].fName,
            lName:      user[0].lName,
            email:      user[0].email,
            joined:     user[0].created,
            avatar:     user[0].avatar
        });
    } 
    catch (error) {
        res.status(500).send(error);
    }
});


// Edit user details
app.put('/api/edit-user', async (req, res, next) => {
    const User = require('./models/User');
    const {fName, lName, email, userId} = req.body;

    try {
        await User.findByIdAndUpdate({_id: userId}, {fName, lName, email});
        const updatedUser = await User.findById({_id: userId});
        res.status(201).send({
            _id:        updatedUser._id,
            fName:      updatedUser.fName,
            lName:      updatedUser.lName,
            avatar:     updatedUser.avatar.length > 0 ? updatedUser.avatar : null,
            email:      updatedUser.email,
            joined:     updatedUser.created
        });
    } 
    catch (error) {
        res.status(500).send(error);
    }
});



// Get all the houses
app.get('/api/get-all-houses', async (req, res, next) => {
    const House = require('./models/House.js');

    try {
        const housesList = await House.find();
        res.status(200).send(housesList);
    } 

    catch (error) {
        res.status(500).send(error);
    }
});


// Create category
app.post('/api/create-house', async (req, res, next) => {
    const House = require('./models/House.js');
    const { author, number, street, city, postcode, description, price, typeOfTenancy } = req.body;

    try {
        const house = await House.create({author, number, street, city, postcode, description, price, typeOfTenancy});
        res.status(201).send(house);
    } 
    catch (error) {
        res.status(500).send(error);
    }
});


// Update House
app.put('/api/update-house/:_id', async (req, res, next) => {
    const House = require('./models/House.js');
    const { number, street, city, postcode, description, price, typeOfTenancy } = req.body;

    try {
        await House.findByIdAndUpdate({_id: req.params._id}, 
            {number, street, city, postcode, description, price, typeOfTenancy});
        return res.status(201).send('Updated');
    } 
    catch (error) {
        return res.status(500).send(error);
    }
});


// Delete house and pictured
app.delete('/api/delete-house/:_id', async (req, res, next) => {
    const House = require('./models/House.js');
    const { deleteImage } = require('./helpers/deleteImage.js');

    // Get the book that needs to be deleted
    // If the book contains one or more images, delete first the images and than delete the database record
    try {
        const house = await House.find({_id: req.params._id});
        if (house[0].images.length >= 1) {
            house[0].images.map(async image => {
                deleteImage(image);
                await House.findByIdAndDelete(req.params._id);
            });
            return res.status(201).send('Deleted.');
        }
        else if (house[0].images.length === 0) {
            await House.findByIdAndDelete(req.params._id);
            return res.status(201).send('Deleted.');
        }
    } 
    catch (error) {
        return res.status(500).send(error);
    }
})



// Get house by id 
app.get('/api/get-house-by-id/:_id', async (req, res, next) => {
    const House = require('./models/House.js');

    try {
        const house = await House.find({_id: req.params._id});
        return res.status(200).send(house[0]);
    } 
    catch (error) {
        return res.status(500).send(error);
    }
});


// Add images to house
app.put('/api/add-image/:_id', multer, async (req, res, next) => {
        const House = require('./models/House.js');
        // Build the image path
        const file = req.file ? 
        req.protocol + '://' + req.get('host') + '/' + req.file.path 
        : null;

        try {
            await House.findByIdAndUpdate({_id: req.params._id}, { $push: {images: file}});
            return res.status(201).send('House image added successfully.');
        } 
        catch (error) {
            return res.status(500).send(error);
        }
});



// Get all the houses created by the user
app.get('/api/get-created-houses/:_id', async (req, res, next) => {
    const House = require('./models/House.js');

    try {
        const requiredHouses = await House.find({author: req.params._id});
        requiredHouses.length > 0 
        ? res.status(201).send(requiredHouses) 
        : res.status(404).send('No houses created yet.');
    } 
    catch (error) {
        if (error.name === 'CastError') 
            return res.status(500).send('There are some errors with your query. Please make sure the details are written correctly');
        else
            return res.status(500).send(error);
    }
});





module.exports = app;



