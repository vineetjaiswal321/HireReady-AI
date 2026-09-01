import mongoose from "mongoose";

const mockInterviewAnswerSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },

        answer: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },

        feedback: {
            type: String,
            required: true
        },

        strengths: {
            type: [String],
            default: []
        },

        improvements: {
            type: [String],
            default: []
        }
    },
    {
        _id: true
    }
);


const mockInterviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        interviewReport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InterviewReport",
            required: true
        },

        answers: {
            type: [mockInterviewAnswerSchema],
            default: []
        },

        overallScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "in-progress",
                "completed"
            ],
            default: "in-progress"
        },

        startedAt: {
            type: Date,
            default: Date.now
        },

        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);


export const MockInterview = mongoose.model(
    "MockInterview",
    mockInterviewSchema
);