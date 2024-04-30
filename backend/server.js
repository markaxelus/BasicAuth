import express from "express"; 
import { PORT } from "./config/config.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routers Init
import userRouter from './routers/userRouter.js'
import articleRouter from './routers/articleRouter.js'


if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: '../.env' });
}

const app = express(); // Define express

// Middlewares for CORS Policy
// Method 1: Allow all origins with default of cors(*)
//app.use(cors());
// Method 2: Allow Custom Origins [better option]
app.use(
    cors(
        {
            origin: 'http://localhost:3000/',
            methods: ['POST', 'PUT', 'GET', 'DELETE'],
            allowedHeaders: ['Content-Type']
        }
    )
);

// Middlewares for parsing json
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

app.use('/users', userRouter);
app.use('/article', articleRouter);

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

