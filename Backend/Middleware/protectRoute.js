import jwt from "jsonwebtoken"
import User from "../Model/userModel.js"
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
             return res.status(401).json({
                success: false,
                message: "Unauthorized. No token provided.",
             });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
         });
      }

        const user = await User.findById(decoded.userId);
        if (!user) {
           return res.status(404).json({
              success: false,
              message: "User not found",
           });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
           success: false,
           message: error.message,
        });
    }
}