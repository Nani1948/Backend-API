import mongoose from "mongoose";

// Define the structure of a product
const productSchema = new mongoose.Schema(
     {
        // Product name
        name: {
            type: String,
            required: true,
            trim: true
        },

         // Product price
        price: {
            type: Number,
            required: true,
            min: 0
        },
         // Product description
        description: {
            type: String,
            required: true
        },
          // Available product stock
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        // Automatically add createdAt and updatedAt
        timestamps: true
    }
);
// Create Product model
const Product = mongoose.model("Product", productSchema);

export default Product;