import { User } from '../models/userModel.js';
import express from 'express';

const userRouter = express.Router();

// POST: Register a new user
userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({ message : 'Send all required fields'});  
    }
    try {
        // hashing password
        const newUser = await User.create({ name, email, password});
        res.status(201).send(`User successfully created, name: ${newUser.name}`);
        return res.json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// POST: Login user
userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            throw new Error("Auth failed");
        }
        res.send(`User ${user.name} logged in successfully`);
    } catch(error){
        res.status(401).send(error.message);
    }
});

// FETCH user profile [one]
userRouter.get('/profile/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });
        if (!user) {
            throw new Error('User not found');
        }
        res.json({ data: user });
    } catch(error) {
        res.status(404).send(error.message);
    }
});

// PUT: update user profile
userRouter.put('/update/:name', async(req, res) => {
    try {
        const { bio, profilePicture } = req.body;
        const user = await User.findOneAndUpdate({ name: req.params.name }, {
            bio: bio,
            profilePicture: profilePicture
        }, 
        { 
            new: true // Returns the updated object
        });
        if (!user) {
            throw new Error("User not found");
        }
        res.send(`User: ${user.name} updated`)
    } catch (error){
        res.status(400).send(error.message);
    }
});

export default userRouter;