import { User } from '../models/userModel.js';
import express from 'express';
import { hashPassword, comparePassword } from '../controllers/auth.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

// POST: Register a new user
userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).send({ message : 'Send all required fields'});  
    }
    if (password.length < 6) {
        return res.json({ error: 'Password length must be at least 6'})
    }
    try {
        // hashing password
        const hashedPass = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPass });
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
        if (!user) {
            return res.json({ error: "No user found" });
        }
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        }

        if (!match) {
            res.json({ error: 'password do not match' });
        }
    
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