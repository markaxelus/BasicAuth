import express from "express"; 
import { PORT } from "./config.js";

const app = express(); // Define express

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})  

