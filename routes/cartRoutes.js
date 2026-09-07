import express from "express";
import {
    addToCart,
    updateCart,
    removeFromCart
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

// Create Express router
const router = express.Router();

// /cart - Add product to cart
router.post("/", authMiddleware, addToCart);

// /cart/:id - Update cart item quantity
router.put("/:id", authMiddleware, updateCart);

// /cart/:id - Remove product from cart
router.delete("/:id", authMiddleware, removeFromCart);

export default router;