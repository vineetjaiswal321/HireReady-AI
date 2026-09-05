import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { generateCareerMentorResponse } from "../services/mentor.services.js";
import {MentorConversation} from "../models/mentorConersation.models.js"


const chatWithCareerMentor=asyncHandler(async (req, res)=>{

    const {message, conversationId}=req.body;

    if(!message || !message.trim()){
        throw new ApiError(400, "Message is required")
    }

    const user=await User.findById(req.user.id).select("-password -resetPasswordToken -resetPasswordExpires")

    if(!user){
        throw new ApiError(404, "User not found")
    }

    let conversation;

    if(conversationId){
        conversation=await MentorConversation.findOne({
            _id: conversationId,
            userId: user._id
        })

        if(!conversation){
            throw new ApiError(404, "Conversation not found")
        }
    } else{
        conversation=await MentorConversation.create({
            userId: user._id,
            messages:[]
        })
    }

    conversation.messages.push({
        role: "user",
        parts: [
            {
                text: message.trim()
            }
        ]
    })

    const userProfile = {
        name: user.name,
        bio: user.bio,
        skills: user.skills,
        education: user.education,
        experience: user.experience,
        projects: user.projects,
        achievements: user.achievements
    };


    const conversationHistory = conversation.messages.map((msg) => ({
    role: msg.role,
    parts: msg.parts
}));


    const response = await generateCareerMentorResponse({
        userProfile,
        conversation: conversationHistory
    });

    conversation.messages.push({
        role: "assistent",
        parts: [
            {
                text: response
            }
        ]
    })

    await conversation.save();

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            conversationId: conversation._id,
            response
        },
        "Career mentor response generated successfully"
    ))
})

export {chatWithCareerMentor}

