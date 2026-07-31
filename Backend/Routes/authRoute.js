import express from "express"
import { signin, signout, signup } from "../Controller/authController.js"
import { authLimiter } from "../RateLimiters/rateLimiter.js";

const router = express.Router();

router.post("/", authLimiter, signup);
router.get("/", authLimiter, signin);
router.get("/logout",signout)



export default router;