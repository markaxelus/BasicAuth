import { User } from '../models/userModel.js';
import express from 'express';
import { hashPassword, comparePassword } from '../controllers/auth.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

// Only .post routes were utilized 

// POST: Register a new user
userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.json({ message : 'Send all required fields'});  
    }
    if (password.length < 6) {
        return res.json({ error: 'Password length must be at least 6'})
    }
    try {
        // hashing password
        const hashedPass = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPass });
        return res.status(201).json({
            message: `User successfully created`,
            user: {
                name: newUser.name,
                email: newUser.email,
            }
        });
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
                if (err) {
                    throw new err;
                };
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


export default userRouter