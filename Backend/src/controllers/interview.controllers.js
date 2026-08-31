import asyncHandler from "../utils/asyncHandler.js";
import { PDFParse } from "pdf-parse";
import {generateInterviewReport, generateResumePDF} from "../services/ai.services.js";
import { InterviewReport } from "../models/interviewReport.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";


const generateInterviewReportController = asyncHandler(async (req, res) => {

    if (!req.file) {
        return res.status(400).json(
            new ApiResponse(400, null, "Resume PDF is required")
        );
    }

    const parser = new PDFParse({
        data: req.file.buffer
    });

    const result = await parser.getText();

    const resumeContent = result.text;

    await parser.destroy();

    const {
        selfDescription,
        jobDescription,
        experienceLevel,
        interviewType
    } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription,
        experienceLevel,
        interviewType
    });

    const interviewReport = await InterviewReport.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json(
        new ApiResponse(
            201,
            interviewReport,
            "Generated Successfully"
        )
    );
});


const generateInterviewReportByIdController = asyncHandler(
    async (req, res) => {

        const { interviewId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Invalid interview ID"
                )
            );
        }

        const interviewReport = await InterviewReport.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Interview report not found"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                interviewReport,
                "Interview report fetched successfully"
            )
        );
    }
);

const getAllInterviewReportsController = asyncHandler(
    async (req, res) => {

        const interviewReports = await InterviewReport
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -preparationPlan"
            );

        res.status(200).json(
            new ApiResponse(
                200,
                interviewReports,
                "Interview reports fetched successfully"
            )
        );
    }
);

const generateResumePdfController=asyncHandler(async (req, res)=>{

    const {interviewReportId}=req.params;

    const interviewReport=await InterviewReport.findById(interviewReportId)

    if(!interviewReport){
        throw new ApiError(404, "Interview Report not found")
    }

    const {resume, jobDescription, selfDescription}=interviewReport

    const pdfBuffer=await generateResumePDF({resume, jobDescription, selfDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition" : `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer);

})


export  {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};