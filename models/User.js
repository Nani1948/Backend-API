import mongoose from "mongoose";

// Define the structure of a user
const userSchema = new mongoose.Schema(
{
        // User name
        name: {
            type: String,
            required: true,
            trim: true
        },

        // User email
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

       // Hashed user password
        password: {
            type: String,
            required: true
        }
    },
    {
        // Automatically add createdAt and updatedAt
        timestamps: true
    }
);
// Create User model
const User = mongoose.model("User", userSchema);

export default User;