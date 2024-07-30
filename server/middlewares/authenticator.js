import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticator=async (req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        const verified=await jwt.verify(token,process.env.SECRET);
        const user=await User.findOne({email:verified.email})
        req.user={};
        req.user.id=`${user._id}`
        next();
    } catch (error) {
        res.status(401).send("Invalid Token")
    }
}