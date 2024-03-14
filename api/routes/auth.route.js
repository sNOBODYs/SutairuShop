import express from 'express';
import { login, signup, verifyToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/protected", verifyToken, (req, res) =>{
    res.send("Protected route");
});

export default router;