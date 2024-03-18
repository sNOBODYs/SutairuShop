import express from 'express';
import { login, signup, verifyToken, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post('/google', google);
router.get("/protected", verifyToken, (req, res) =>{
    res.send("Protected route");
});

export default router;