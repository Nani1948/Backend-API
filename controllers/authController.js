import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Register a new user
export const registerUser = async (req, res) => {
    try {
        //Get user details from request body
        const { name, email, password } = req.body;

        //Check whether all fiedls are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //Check whether user are already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash the password before storing it
        const hashPassword = await bcrypt.hash(password, 10);

        //Create a new user
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        //Send succeess resposne
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    } catch (error) {
        //Handle server error
        res.status(500).json({
            message: "Registration failed",
        });
    }
};

//Login an existing user
export const loginUser = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check whether all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check whether user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hash password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send token to the client
        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


