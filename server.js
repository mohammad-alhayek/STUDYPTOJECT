import express from 'express';
import path from 'path';
import routes from './routes/index.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api', routes);

connectDB();

//open server in custom port 
app.listen(3000,()=>{


console.log('server started');

}
)