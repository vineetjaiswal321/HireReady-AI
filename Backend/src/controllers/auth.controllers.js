import { TokenBlackListModel } from "../models/blacklist.models.js";
import {User} from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




const registerUserController = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new ApiError(400,
            "Some details are missing",
        )
    }

    const isUserAlreadyExist = await User.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExist){
        throw new ApiError(400, "User Already Exist")
    }

    const hash=await bcrypt.hash(password, 10);

    const user= await User.create({
        username, 
        email, 
        password : hash
    })

    const token=jwt.sign({
            id: user._id,
            username : user.username
        },
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )


    res.cookie("token", token);
    const userResponse= await User.findById(user._id).select("-password");

    return res.status(200).json(new ApiResponse(200, userResponse, "User created successfully "))

})


const loginUserController= asyncHandler(async (req, res)=>{
    const {email, password} = req.body;

    const user=await User.findOne({email});

    if(!user){
        throw new ApiError(400, "User dosen't exists")
    }

    const isPasswordCorrect=await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Incorrect Password")
    }

    const token=jwt.sign({
            id: user._id,
            username : user.username
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token);

    const userResponse= await User.findById(user._id).select("-password");

    return res.status(200).json(new ApiResponse(200, userResponse,  "User Logged in successfully"))

})

const logoutUser=asyncHandler(async (req, res)=>{
    const token=req.cookies.token;

    if(token){
        await TokenBlackListModel.create({token})
    }

    res.clearCookie("token");

    res.status(200).json(new ApiResponse(200, {}, "Logout Successfully"))
})

const getMe=asyncHandler(async (req, res)=>{
    const user=await User.findById(req.user._id).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "User detail fetched successfully"))
})

export {
    registerUserController,
    loginUserController,
    logoutUser,
    getMe
}