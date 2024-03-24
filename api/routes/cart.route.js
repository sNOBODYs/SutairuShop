import express from 'express';
import { addCart, getCart, updateCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add", addCart);
router.get("/get", getCart);
router.post("/update/:id",verifyToken, updateCart);

export default router;