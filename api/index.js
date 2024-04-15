import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error);
})
// 'https://sutairu-shop.vercel.app';
//'http://localhost:3000';
const app = express();
app.use(cors({
    origin: 'https://sutairu-shop.vercel.app', // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
});