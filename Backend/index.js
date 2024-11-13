import express from 'express';
import cors from 'cors';
import {connectDB} from './database.js';
import user from './Routes/CreateUser.js';
import displaydata from './Routes/DisplayData.js';
import orderData from './Routes/OrderData.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const app = express();

const allowedOrigins = [
    'http://localhost:5173', // Local frontend
    'https://food-delivery-app-ten-bay.vercel.app' // Production frontend (Vercel)
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow request from allowed origins or no origin (e.g., Postman)
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));


app.use(express.json());

app.use('/api',user);
app.use('/api',displaydata);
app.use('/api',orderData);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

connectDB();