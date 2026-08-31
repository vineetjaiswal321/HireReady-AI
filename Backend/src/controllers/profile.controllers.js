import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const updateProfile=asyncHandler(async (req, res)=>{
    try {
        const userId=req.user.id;

        const updatedUser=await User.findByIdAndUpdate(userId,
            {$set : req.body},
            {
                new: true,
                runValidators : true
            }
        ).select("-password")

        if(!updatedUser){
            throw new ApiError(404, "User Not Found")
        }

        return res.status(200).json(new ApiResponse(200, updatedUser, "Profile Updated Successfully"))

    } catch (error) {
        console.log(error)
        throw error;
    }
})

export default updateProfile;