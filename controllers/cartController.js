import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//  Add a product to the cart
export const addToCart = async (req, res) => {
    try {
        // Get product ID and quantity from request body
        const { productId, quantity } = req.body;

        // Check whether product ID and quantity are provided
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required"
            });
        }

        // Check whether product ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        // Check whether product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check whether enough stock is available
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient product stock"
            });
        }

        // Check whether product is already in the cart
        const existingCartItem = await Cart.findOne({
            user: req.user.userId,
            product: productId
        });

        // Update quantity if product already exists
        if (existingCartItem) {

            // Check whether updated quantity exceeds stock
            if (existingCartItem.quantity + quantity > product.stock) {
                return res.status(400).json({
                    message: "Insufficient product stock"
                });
            }
            existingCartItem.quantity += quantity;

            await existingCartItem.save();

            return res.status(200).json({
                message: "Cart quantity updated",
                cartItem: existingCartItem
            });
        }

        // Create a new cart item
        const cartItem = await Cart.create({
            user: req.user.userId,
            product: productId,
            quantity
        });

        // Send success response
        res.status(201).json({
            message: "Product added to cart",
            cartItem
        });

    }
    catch (error) {
        // Handle server errors
        res.status(500).json({
            message: "Failed to add product to cart",
            error: error.message
        });
    }
};

// Update cart item quantity
export const updateCart = async (req, res) => {
    try {
        // Get quantity from request body
        const { quantity } = req.body;

        // Check whether quantity is valid
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }
        // Check whether cart ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid cart ID"
            });
        }

        // Find cart item belonging to logged-in user
        const cartItem = await Cart.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        // Check whether cart item exists
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        // Find the product related to the cart item
        const product = await Product.findById(cartItem.product);

        // Check whether product exists
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check whether requested quantity exceeds stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient product stock"
            });
        }
        // Update cart quantity
        cartItem.quantity = quantity;

        await cartItem.save();

        // Send updated cart item
        res.status(200).json({
            message: "Cart updated successfully",
            cartItem
        });

    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: "Failed to update cart",
            error: error.message
        });
    }
};


// Remove a product from the cart
export const removeFromCart = async (req, res) => {
    try {
        // Find and delete cart item belonging to logged-in user
        const cartItem = await Cart.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        // Check whether cart item exists
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        // Send success response
        res.status(200).json({
            message: "Product removed from cart"
        });

    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: "Failed to remove product from cart",
            error: error.message
        });
    }
};

