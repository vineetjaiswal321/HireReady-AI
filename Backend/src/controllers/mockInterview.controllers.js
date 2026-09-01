import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js"
import { InterviewReport } from "../models/interviewReport.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { evaluateMockAnswer } from "../services/ai.services.js";
import { MockInterview } from "../models/mockInterviews.models.js";



export const evaluateMockAnswerController = asyncHandler(
    async (req, res) => {
        const { mockInterviewId, question, answer } = req.body;

        if (!mockInterviewId) {
            throw new ApiError(400, "Mock interview ID is required");
        }

        if (!question?.trim()) {
            throw new ApiError(400, "Question is required");
        }

        if (!answer?.trim()) {
            throw new ApiError(400, "Answer is required");
        }

        if (!mongoose.Types.ObjectId.isValid(mockInterviewId)) {
            throw new ApiError(400, "Invalid mock interview ID");
        }

        const mockInterview = await MockInterview.findOne({
            _id: mockInterviewId,
            user: req.user.id
        }).populate("interviewReport");

        if (!mockInterview) {
            throw new ApiError(404, "Mock interview not found");
        }

        if (mockInterview.status === "completed") {
            throw new ApiError(
                400,
                "This mock interview is already completed"
            );
        }

        // Evaluate answer using AI
        const evaluation = await evaluateMockAnswer({
            question,
            answer,
            experienceLevel:
                mockInterview.interviewReport?.experienceLevel,
            interviewType:
                mockInterview.interviewReport?.interviewType
        });

        // Store answer + evaluation
        mockInterview.answers.push({
            question,
            answer,
            score: evaluation.score,
            feedback: evaluation.feedback,
            strengths: evaluation.strengths,
            improvements: evaluation.improvements
        });

        // Calculate overall score
        const totalScore = mockInterview.answers.reduce(
            (sum, item) => sum + item.score,
            0
        );

        mockInterview.overallScore = Math.round(
            totalScore / mockInterview.answers.length
        );

        // Calculate total questions
        const totalQuestions =
            (mockInterview.interviewReport?.technicalQuestions?.length || 0) +
            (mockInterview.interviewReport?.behavioralQuestions?.length || 0);

        // Check if this was the final question
        if (mockInterview.answers.length >= totalQuestions) {
            mockInterview.status = "completed";
            mockInterview.completedAt = new Date();
        }

        await mockInterview.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    evaluation,
                    overallScore: mockInterview.overallScore,
                    status: mockInterview.status,
                    completedAt: mockInterview.completedAt
                },
                "Answer evaluated successfully"
            )
        );
    }
);


export const startMockInterviewController = asyncHandler(
    async (req, res) => {

        const { interviewReportId } = req.body;

        // ================= VALIDATION =================

        if (!interviewReportId) {
            throw new ApiError(
                400,
                "Interview report ID is required"
            );
        }

        if (
            !mongoose.Types.ObjectId.isValid(
                interviewReportId
            )
        ) {
            throw new ApiError(
                400,
                "Invalid interview report ID"
            );
        }


        // ================= FIND REPORT =================

        const interviewReport =
            await InterviewReport.findOne({
                _id: interviewReportId,
                user: req.user.id
            });

        if (!interviewReport) {
            throw new ApiError(
                404,
                "Interview report not found"
            );
        }


        // ================= CREATE MOCK INTERVIEW =================

        const mockInterview =
            await MockInterview.create({
                user: req.user.id,

                interviewReport: interviewReport._id,

                answers: [],

                overallScore: 0,

                status: "in-progress",

                startedAt: new Date()
            });


        // ================= RESPONSE =================

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    mockInterviewId: mockInterview._id
                },
                "Mock interview started successfully"
            )
        );
    }
);

export const getMockInterviewByIdController = asyncHandler(
    async (req, res) => {

        const { mockInterviewId } = req.params;

        
        if (!mongoose.Types.ObjectId.isValid(mockInterviewId)) {
            throw new ApiError(
                400,
                "Invalid mock interview ID"
            );
        }

        const mockInterview = await MockInterview.findOne({
            _id: mockInterviewId,
            user: req.user.id
        }).populate("interviewReport");

        if (!mockInterview) {
            throw new ApiError(
                404,
                "Mock interview not found"
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    mockInterviewId: mockInterview._id,
                    interviewReport: mockInterview.interviewReport,
                    answers: mockInterview.answers,
                    overallScore: mockInterview.overallScore,
                    status: mockInterview.status,
                    startedAt: mockInterview.startedAt,
                    completedAt: mockInterview.completedAt
                },
                "Mock interview fetched successfully"
            )
        );
    }
);


export const getMyMockInterviewsController = asyncHandler(
    async (req, res) => {

        const mockInterviews = await MockInterview.find({
            user: req.user.id
        })
            .populate("interviewReport")
            .sort({ createdAt: -1 });

        return res.status(200).json(
            new ApiResponse(
                200,
                mockInterviews,
                "Mock interviews fetched successfully"
            )
        );
    }
);