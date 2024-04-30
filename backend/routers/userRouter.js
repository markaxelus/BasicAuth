import { User } from '../models/userModel.js'

const express = require('express');
const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // hashing password
        const newUser = new User({ username, email, password});
        await newUser.save();
        res.status(201).send(`User successfully created, username: ${newUser.username}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// POST: Login user
router.post('/login', async (req, res) => {
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

