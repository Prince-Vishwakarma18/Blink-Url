import Url from "../Model/urlModel.js";
import { nanoid } from "nanoid";

export const generateShortUrl = async (req, res) => {
   try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
         return res.status(400).json({
            success: false,
            message: "URL is required",
         });
      }

      try {
         const parsedUrl = new URL(originalUrl);
         if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).json({
               success: false,
               message: "Only http and https URLs are allowed",
            });
         }
      } catch (error) {
         return res.status(400).json({
            success: false,
            message: "Please enter a valid URL",
         });
      }

      let shortUrl;
      let isExists = true;
      while (isExists) {
         shortUrl = nanoid(7);
         const existingUrl = await Url.findOne({ shortUrl });
         if (!existingUrl) {
            isExists = false;
         }
      }
      const newUrl = await Url.create({
         originalUrl,
         shortUrl,
         user: req.user._id,
      });

      return res.status(201).json({
         success: true,
         message: "Short URL created successfully",
         data: {
            id: newUrl._id,
            originalUrl: originalUrl,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortUrl}`,
         },
      });

   } catch (error) {
    console.error(error);

    return res.status(500).json({
       success: false,
       message: "Internal Server Error",
    });
   }
};


export const redirectToOriginalUrl = async (req, res) => {
   try {
      const {shortUrl} = req.params;
      const redirectUrl = await Url.findOne({shortUrl});

      if (!redirectUrl) {
         return res.status(404).json({
            success: false,
            message: "Short URL not found",
         });
      }

      console.log(redirectUrl);
   } catch (error) {
      console.log(error.message)
   }
}