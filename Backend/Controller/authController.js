import bcrypt from "bcryptjs";
import User from "../Model/userModel.js";
import  generateToken  from "../Utils/generateToken.js";

export const signup = async (req, res) => {
   try {
      const { name, email, password, confirmPassword } = req.body;
      if (!name || !email || !password || !confirmPassword) {
         return res.status(400).json({
            success: false,
            message: "All fields required",
         });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(409).json({
            success: false,
            message: "User already exists",
         });
      }

      if (password != confirmPassword) {
         return res.status(400).json({
            success: false,
            message: "Password do not match",
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
      });

      generateToken(res, user._id);
      return res.status(201).json({
         success: true,
         message: "User registered successfully",
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
         },
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const signin = async (req, res) => {
   try {
      const {email, password} = req.body;
      if (!email || !password) {
          return res.status(400).json({
             success: false,
             message: "All fields required",
          });
      }
      const user = await User.findOne({email}).select("+password");
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
          return res.status(400).json({
             success: false,
             message: "Invalid password",
          });
       }
       
       generateToken(res,user._id);
       return res.status(200).json({
          success: true,
          message: "User signin successfully",
          user: {
             id: user._id,
             name: user.name,
             email: user.email,
             role: user.role,
          },
       });


   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
}

export const signout = async (req,res) => {
   try {
      res.clearCookie("token", {
         httpOnly: true,
         sameSite: "strict",
         secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({
         success: true,
         message: "Logged out successfully",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
      });
   }
}