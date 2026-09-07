import jwt from "jsonwebtoken";

//Verify JWT token
const authMiddleware = (req, res, next) => {
    try {
        // Get authorization header
        const authHeader = req.headers.authorization;

        // Check whether authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        // Check whether header starts with Bearer
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }
        // Get token from the header
        const token = authHeader.split(" ")[1];

        // Verify the JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // Store decoded user information in request
        req.user = decoded;

        // Continue to the next middleware/controller
        next();
    } catch (error) {
        // Handle invalid or expired token
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;