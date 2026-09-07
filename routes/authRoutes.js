import express from "express";
import {
    registerUser,
    loginUser
} from "../controllers/authController.js";

// Create Express router
const router = express.Router();

//  Register a new user
router.post("/register", registerUser);

//  /login - Login an existing user
router.post("/login", loginUser);

export default router;