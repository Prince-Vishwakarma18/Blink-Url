import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      select:false
   },
   role:{
    type:String,
    enum:["user","admin"],
    default:"user"
   }
},{timestamps:true});

export default mongoose.model("User",userSchema);