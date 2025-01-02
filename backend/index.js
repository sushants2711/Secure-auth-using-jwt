import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./utils/db.js";
import authroute from "./routes/authroute.js";
import productroute from "./routes/productrouter.js";


// dotenv configration
dotenv.config();

// app initialize through express
const app = express();

// for passing api from frontend
app.use(cors())

// port initialize
const PORT = process.env.PORT || 5000 ;

// json request for body parser for data parse
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// path request forward 
app.use("/api/test", authroute)
app.use("/api/home", productroute)


app.listen(PORT, () => {
    connectDb() // database calling for connection
    console.log(`Server started on port ${PORT}`)  // server on listen port number xyz
})