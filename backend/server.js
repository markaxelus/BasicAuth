import express from "express"; 
import { PORT } from "./config/config.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routers Init
import userRouter from './routers/userRouter.js'

if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: '../.env' });
}

const app = express(); // Define express

app.use(express.json()); // Middlewares for parsing json
app.use(express.urlencoded({ extended: true}));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send(`MERN Tutorial`)
    // or res.send(`MERN Tutorial`) but generic, not used widely
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("MongoDB Database connected");
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })

