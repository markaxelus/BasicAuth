import express from "express"; 
import { PORT, mongoDBURL } from "./config.js";

const app = express(); // Define express

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send(`MERN Tutorial`)
    // or res.send(`MERN Tutorial`) but generic, not used widely
});



mongoose.connect(mongoDBURL)
    .then(() => {
    console.log("MongoDB database connected");
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
