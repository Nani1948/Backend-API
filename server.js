import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import connectDB from "./config/data.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Allow frontend to communicate with backend
app.use(cors());

// Parse incoming JSON request data
app.use(express.json());

// Connect the application to MongoDB
connectDB();

// Test route to check whether the API is running
app.get("/", (req, res) => {
    res.json({
        message: "ShoppyGlobe API is running"
    });
});

//Routes
app.use("/products",productRoutes);
app.use("/auth",authRoutes)
app.use("/cart",cartRoutes);

// Error handling middleware
app.use(errorMiddleware);

//Port
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});