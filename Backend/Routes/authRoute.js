import express from "express"
import { signin, signout, signup } from "../Controller/authController.js"

const router = express.Router();

router.post("/",signup);
router.get("/",signin);
router.get("/logout",signout)



export default router;