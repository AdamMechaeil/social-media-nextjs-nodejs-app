import mongoose, { Schema, model } from "mongoose";

const userSchema= new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:String
    },
    profilePicture:{
        type:String
    },
    friends:{
        type:Array
    },
    requestsReceived:{
        type:Array,
        default:[]
    },
    requestSent:{
        type:Array,
        default:[]
    },
    otp:{
        type:String
    }
})

const User=model("User",userSchema);
export default User;