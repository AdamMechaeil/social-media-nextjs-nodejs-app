// import { transporter } from "../config/db.js";
import User from "../models/user.js";
import nodemailer from "nodemailer"

async function requestsFormatter(reqArray) {
  let user = [];
  for await (let id of reqArray) {
    const returnValue = await retriveUser(id);
    user.push(returnValue);
  }
  return user;
}

async function retriveUser(id) {
  try {
    const query = User.findById(id);
    query.select("_id firstname lastname profilePicture");
    const user = await query.exec();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const query = User.find({
      $and: [
        {
          _id: {
            $not: { $eq: req.user.id },
          },
        },{
          _id: {
            $nin: user.friends,
          },
        },{
          _id: {
            $nin: user.requestsReceived,
          },
        },{
          _id: {
            $nin: user.requestSent,
          },
        },
      ],
    });
    query.select("_id firstname lastname");
    const users = await query.exec();
    res.send({ users, msg: "All users" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    const query = User.findById(_id);
    query.select(
      "firstname lastname gender phone email age profilePicture friends requestSent"
    );
    const user = await query.exec();
    res.send({ user, msg: "User By ID" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, req.body);
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const sender = req.user.id;
    const reciever = req.params._id;
    await User.updateOne({ _id: sender }, { $push: { requestSent: reciever } });
    await User.updateOne(
      { _id: reciever },
      { $push: { requestsReceived: sender } }
    );

    res.send("Request Sent");
  } catch (error) {}
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const acceptingPerson = req.user.id;
    const sender = req.params._id;
    const acceptingUser = await User.findOne({ _id: acceptingPerson });
    const senderUser = await User.findOne({ _id: sender });

    await User.updateOne(
      { _id: acceptingPerson },
      { $push: { friends: sender } }
    );
    await User.updateOne(
      { _id: sender },
      { $push: { friends: acceptingPerson } }
    );

    const updatedAcceptor = acceptingUser.requestsReceived.filter((ele) => {
      if (ele != sender) return ele;
    });
    const updatedSender = senderUser.requestSent.filter((ele) => {
      if (ele != acceptingPerson) {
        return ele;
      }
    });
    await User.findOneAndUpdate(
      { _id: acceptingPerson },
      { requestsReceived: updatedAcceptor }
    );
    await User.findOneAndUpdate(
      { _id: sender },
      { requestSent: updatedSender }
    );

    res.send("Request accepted");
  } catch (error) {
    console.log(error);
  }
};

export const requestsReceived = async (req, res) => {
  try {
    const id = req.user.id;
    const query = User.findOne({ _id: id });
    query.select("requestsReceived");
    const user = await query.exec();
    const requestsReceived = await requestsFormatter(user.requestsReceived);
    res.send({ requestsReceived, msg: "All requests received" });
  } catch (error) {
    console.log(error);
  }
};

export const findUserByEmail= async (req,res)=>{
  try {
    
    const query=User.findOne({
      email:req.body.email
    })
    query.select("firstname lastname email _id");
    const user=await query.exec();
    res.send({user,msg:"msg"})
  } catch (error) {
    console.log(error);
  }
}

export const generateOtp= async (req,res)=>{
  try {
    
    const otp=Math.ceil(10**4*Math.random()+10**3*Math.random()+10**2*Math.random()+10**1*Math.random())+1000;
    await User.findByIdAndUpdate(req.body._id,{
      otp:otp
    })
    const user=await User.findOne({_id:req.body._id})
    //send otp on email
    const transporter=nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      })

  await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "OTP verification",
      text: `Your OTP for verification is ${otp}`
  });

    res.send("Generated");
  } catch (error) {
    console.log(error);
  }
}

export const verifyOtp= async (req,res)=>{
  try {
    const user=await User.findOne({
      _id:req.body._id
    })
    console.log(req.body);
    if(user.otp==req.body.otp)
      res.send({verified:true,msg:"Verified"})
    else
      res.send({verified:false,msg:"Enter otp again"})

  } catch (error) {
    console.log(error);
  }
}
