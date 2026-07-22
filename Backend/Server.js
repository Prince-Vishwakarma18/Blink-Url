import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    console.log("Hello")
})

const PORT = process.env.PORT || 3000;
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        credentials:true,
    })
)


app.listen(PORT,()=>{
    console.log("Server listen on port " + PORT)
})