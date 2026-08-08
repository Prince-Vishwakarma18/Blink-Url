import express from "express"
import { generateShortUrl, redirectToOriginalUrl } from "../Controller/urlController.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const router = express.Router();

router.post("/generate-url", protectRoute, generateShortUrl);
router.get("/redirect/:shortUrl",redirectToOriginalUrl);

export default router;
