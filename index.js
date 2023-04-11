const express = require("express");
require('dotenv').config();
const {connection} = require("./db");
const {travelRouter} = require("./router/Traveller.router")


const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors({origin:"*"}));

app.get("/", (req,res)=>{
    res.send("Home page");
})

app.use("/travel", travelRouter);

app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
})