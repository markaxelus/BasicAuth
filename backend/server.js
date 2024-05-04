import express from "express"; 
import { PORT } from "./config/config.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// Routers Init
import userRouter from './routers/userRouter.js'


if (process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: '../.env' });
}
// Define express
const app = express(); 

// Middlewares for parsing json
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));

// Middlewares for CORS Policy
// Method 1: Allow all origins with default of cors(*)
app.use(cors({
    origin: 'http://localhost:5173', // Only allow this origin to make requests
    credentials: true // Allows cookies and credentials to be sent along with the request
  }));
  
// Method 2: Allow Custom Origins [better option]
// app.use(
//     cors(
//         {
//             origin: 'http://localhost:3000',
//             methods: ['POST', 'PUT', 'GET', 'DELETE'],
//             allowedHeaders: ['Content-Type'],
//             credentials: true
//         }
//     )
// );

app.use('/users', userRouter);

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send(``)
    // or res.send(``) but generic, not used widely
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

