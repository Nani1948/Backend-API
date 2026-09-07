import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        // Fetch all products from MongoDB
        const products = await Product.find();

        // Send products as response
        res.status(200).json(products);

    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
};
// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        // Find product using the ID from the URL
        const product = await Product.findById(req.params.id);

        // Check whether product exists
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Send product as response
        res.status(200).json(product);

    }
    catch (error) {
        // Handle invalid product ID
        res.status(400).json({
            message: "Invalid product ID",
            error: error.message
        });
    }
};