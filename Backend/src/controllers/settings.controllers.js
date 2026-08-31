import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js"
import ApiError  from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

// Default settings for existing users
const defaultSettings = {
    personalizedPreparation: true,
    aiSuggestions: true,
    adaptiveDifficulty: true,
    followUpQuestions: true,
    showHints: false,
    detailedFeedback: true,

    interviewReminders: true,
    preparationReminders: true,
    jobRecommendations: true,
    profileSuggestions: true,

    profileVisibility: "Private",
    showSocialLinks: true,
    showCodingProfiles: true,

    theme: "Dark",
};


const getSetting = asyncHandler(async (req, res)=>{

    const userId=req.user.id;
    const user=await User.findById(userId).select("settings");

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const settings = {
        ...defaultSettings,
        ...(user.settings?.toObject?.() || user.settings || {}),
    };

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            settings,
            "Setting fetched successfully"
        )
    )

})

const updateSettings=asyncHandler(async (req, res)=>{

    const userId=req.user.id;

    const allowedFields=[
        "personalizedPreparation",
        "aiSuggestions",
        "adaptiveDifficulty",
        "followUpQuestions",
        "showHints",
        "detailedFeedback",

        "interviewReminders",
        "preparationReminders",
        "jobRecommendations",
        "profileSuggestions",

        "profileVisibility",
        "showSocialLinks",
        "showCodingProfiles",

        "theme",
    ];

    const updates={};

    for(const field of allowedFields){
        if(req.body[field]!==undefined){
            updates[`settings.${field}`]=req.body[field]
        }
    }

    if(Object.keys(updates).length===0){
        throw new ApiError(400, "No valid setting provided")
    }

    const user=await User.findByIdAndUpdate(
        userId,
        {
            $set: updates
        },
        {
            new: true,
            runValidators: true
        }
    ).select("settings");

    if(!user){
        throw new ApiError(404, "User not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user.settings,
            "Settings updated successfully"
        )
    )

})

export {
    getSetting,
    updateSettings
}