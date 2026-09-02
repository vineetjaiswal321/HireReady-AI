import { TokenBlackListModel } from "../models/blacklist.models.js";
import {User} from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


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
    const user=await User.findById(req.user.id).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "User detail fetched successfully"))
})

const forgotPasswordController=asyncHandler(async (req, res)=>{
    const {email} = req.body;

    if(!email){
        throw new ApiError(400, "Email is required")    
    }

    const user=await User.findOne({email});

    if(!user){
        return res.status(200).json(new ApiResponse(200, {}, "If the email exists, a reset link will be sent"))
    }

    const resetToken=crypto.randomBytes(32).toString("hex");

    const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken=hashedToken;

    user.resetPasswordExpires=new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    await user.save();


    const resetUrl=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: "Reset Your HireReady-AI Password",
        text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <h2>HireReady-AI Password Reset</h2>

                    <p>We received a request to reset your password.</p>

                    <p>
                        Click the button below to create a new password:
                    </p>

                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 12px 20px;
                            background: #2563eb;
                            color: white;
                            text-decoration: none;
                            border-radius: 6px;
                        "
                    >
                        Reset Password
                    </a>

                    <p style="margin-top: 20px;">
                        This link will expire in <strong>15 minutes</strong>.
                    </p>

                    <p>
                        If you did not request a password reset, you can safely
                        ignore this email.
                    </p>
                </div>
            `,
    });

    return res.status(200).json(new ApiResponse(200, {}, "If the email exists, a reset link will be sent")) 



})

const resetPasswordController=asyncHandler(async (req, res)=>{
    const {token} = req.params;
    const {password} = req.body;

    if(!password){
        throw new ApiError(400, "Password is required")    
    }

    if(password.length < 6){
        throw new ApiError(400, "Password must be at least 6 characters long")    
    }

    const hashedToken=crypto.createHash("sha256").update(token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {$gt: new Date()}
    })

    if(!user){
        throw new ApiError(400, "Invalid or expired reset token")
    }

    const hash=await bcrypt.hash(password, 10);

    user.password=hash;
    user.resetPasswordToken=null;
    user.resetPasswordExpires=null;

    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));

})

const changePasswordController = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Current password and new password are required");
    }

    if (newPassword.length < 6) {
        throw new ApiError(
            400,
            "New password must be at least 6 characters long"
        );
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    );
});

export {
    registerUserController,
    loginUserController,
    logoutUser,
    getMe,
    forgotPasswordController,
    resetPasswordController,
    changePasswordController
}