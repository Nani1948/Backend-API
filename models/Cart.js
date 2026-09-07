import mongoose from "mongoose";

// Define the structure of a cart item
const cartSchema = new mongoose.Schema(
    {
        // User who owns the cart item
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Product added to the cart
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        // Quantity of the product
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        // Automatically add createdAt and updatedAt
        timestamps: true
    }
);

// Create Cart model
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;