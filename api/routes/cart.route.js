import express from 'express';
import { addCart, getCart, updateCart, updateDeliveryInfo} from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/add", addCart);
router.get("/get/:userId", getCart);
router.post("/update/:userId",verifyToken, updateCart);
router.post("/update-delivery/:userId", verifyToken, updateDeliveryInfo);
export default router;