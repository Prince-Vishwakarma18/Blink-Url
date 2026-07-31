import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    url:{
        type:mongoose.Types.ObjectId,
        ref:"Url",
        required:true
    },
    city: String,
   country: String,
   latitude: Number,
   longitude: Number,
   ipAddress: String,
   device: String,
   browser: String
},{timestamps:true})

export default mongoose.model("Click",clickSchema)