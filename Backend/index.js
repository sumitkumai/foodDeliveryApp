import express from 'express';
import cors from 'cors';
import {connectDB} from './database.js';
import user from './Routes/CreateUser.js';
import displaydata from './Routes/DisplayData.js';
import orderData from './Routes/OrderData.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',user);
app.use('/api',displaydata);
app.use('/api',orderData);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();