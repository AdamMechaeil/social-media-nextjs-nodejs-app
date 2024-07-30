import express from "express";
import { acceptFriendRequest, getAllUsers, getUserById, requestsReceived, sendFriendRequest, updateUser } from "../controllers/user.js";
import { authenticator } from "../middlewares/authenticator.js";
const userRouter=express.Router();

userRouter.get("/getAllUsers",authenticator,getAllUsers);
userRouter.get("/getAllReceivedRequests",authenticator,requestsReceived)
userRouter.get("/getUserById/:_id",authenticator,getUserById);
userRouter.put("/updateUserById/:_id",authenticator,updateUser);
userRouter.put("/sendRequest/:_id",authenticator,sendFriendRequest);
userRouter.put("/acceptFriendRequest/:_id",authenticator,acceptFriendRequest)

export default userRouter;