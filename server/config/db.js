import mongoose from "mongoose"
import colors from "colors"
import nodemailer from "nodemailer"
export const connectDb=async ()=>{
    try {
        
        const connect= await mongoose.connect(process.env.MONGO_URL);
        if(connect){
            console.log("Mongo Connected".red.underline.bold);
        }
        
    } catch (error) {
        console.log(error.cyan.bold.underline);
    }
}

// export const transporter=nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });
