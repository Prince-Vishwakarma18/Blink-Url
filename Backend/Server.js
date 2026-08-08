import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import {connectDB} from "./Config/db.js"
import authRoute from "./Routes/authRoute.js"
import urlRoute from "./Routes/urlRoute.js"

dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        credentials:true,
    })
)

app.get("/",(req,res)=>{
    console.log("Hello")
})

app.use("/api/v1/users",authRoute);
app.use("/api/v1/users",authRoute);
app.use("/api/v1/users",authRoute);

app.use("/api/v1/url", urlRoute)
app.use("/api/v1/url", urlRoute)


app.listen(PORT,()=>{
    console.log("Server listen on port " + PORT)
})