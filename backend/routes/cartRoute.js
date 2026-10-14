import express from 'express'
import { addToCart, getToCart, removeToCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

// api endpoints

cartRouter.post('/add', authMiddleware, addToCart)
cartRouter.post('/remove', authMiddleware, removeToCart)
cartRouter.post('/get', authMiddleware, getToCart)

export default cartRouter;