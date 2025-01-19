import express from 'express'
import {config} from 'dotenv';
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
config();
const app=express();

//middlewares
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend URL
    credentials: true,  // Allow credentials (cookies) to be sent
}));

app.use(cookieParser(process.env.COOKIE_SECRET));

// remove it in production
app.use(morgan("dev"));

//remove it in production
app.use(morgan("dev"));

app.use("/api/v1",appRouter);
export default app;