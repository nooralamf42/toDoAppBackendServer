import mongoose, {Schema} from "mongoose";
import "dotenv/config"
Main().catch(err=>console.log(err))
async function Main(){
    mongoose.connect(process.env.MONGOPATH);
    console.log("mongoose is connected")
}

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true, 
        validate : {
            validator : (email)=>{
                return /^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z]{2,}$/.test(email)
            },
            message : "invalid email"
        }
    },
    password : {
        type : String,
        required : true
    }, 
    task: [],
    token : String
})

export const users = mongoose.model("user", userSchema);




