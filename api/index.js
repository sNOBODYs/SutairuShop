import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cartRoutes from './routes/cart.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';


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
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.use(express.static(path.join(__dirname, 'my-app', 'public')));;
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'my-app','public', 'index.html'));
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
});