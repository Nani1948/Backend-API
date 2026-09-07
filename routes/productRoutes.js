import express from "express";
import {
    getProducts,
    getProductById
} from "../controllers/productController.js";

//Create Express router
const router = express.Router();


// Fetch all products
router.get("/", getProducts);
// /products/:id - Fetch product by ID
router.get("/:id", getProductById);
export default router;
