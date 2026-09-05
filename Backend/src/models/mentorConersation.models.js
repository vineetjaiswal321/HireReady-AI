import mongoose from "mongoose"

const mentorMessageSchema=new mongoose.Schema({
    role : {
        type : String,
        enum: ["user", "assistent"],
        required : true
    },
    parts : [
                {
                    text : {
                        type : String,
                        required : true,
                        trim: true
                    }
                }
            ]
}, {timestamps: true})


const mentorConversationSchema=new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
        index: true
    },
    title : {
        type: String,
        default:"New Career Chat",
        trim : true
    },
    messages : {
        type: [mentorMessageSchema],
        default:[]
    }
}, {timestamps: true});

export const MentorConversation=mongoose.model("MentorConversation", mentorConversationSchema);