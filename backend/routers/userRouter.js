import { User } from '../models/userModel.js';
import express from 'express';

const userRouter = express.Router();

// POST: Register a new user
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({ message : 'Send all required fields'});
    }
    try {
        // hashing password
        const newUser = new User({ username, email, password});
        await newUser.save();
        res.status(201).send(`User successfully created, username: ${newUser.username}`);
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
        res.send(`User ${user.username} logged in successfully`);
    } catch(error){
        res.status(401).send(error.message);
    }
});

// FETCH user profile [one]
userRouter.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            throw new Error('User not found');
        }
        res.json({ data: user });
    } catch(error) {
        res.status(404).send(error.message);
    }
});

// PUT: update user profile
userRouter.put('/update/:username', async(req, res) => {
    try {
        const { bio, profilePicture } = req.body;
        const user = await User.findOneAndUpdate({ username: req.params.username }, {
            bio: bio,
            profilePicture: profilePicture
        }, 
        { 
            new: true // Returns the updated object
        });
        if (!user) {
            throw new Error("User not found");
        }
        res.send(`User: ${user.username} updated`)
    } catch (error){
        res.status(400).send(error.message);
    }
});

export default userRouter;