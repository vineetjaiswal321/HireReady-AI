import asyncHandler from "../utils/asyncHandler.js";
import { PDFParse } from "pdf-parse";
import {generateInterviewReport, generateResumePDF} from "../services/ai.services.js";
import { InterviewReport } from "../models/interviewReport.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { uploadPDFToCloudinary } from "../utils/cloudinary.js";


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

    if (interviewReport.pdf?.url) {
        return res.status(200).json({
            success: true,
            pdfUrl: interviewReport.pdf.url,
            generatedAt: interviewReport.pdf.generatedAt,
            alreadyGenerated: true
        });
    }

    const {resume, jobDescription, selfDescription}=interviewReport

    const user=await User.findById(req.user.id).select("-password")

    if(!user){
        throw new ApiError(404, "User Not Found")
    }

    const profile = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,

        headline: user.headline,
        summary: user.summary,

        skills: user.skills,
        experience: user.experience,
        education: user.education,
        projects: user.projects,
        certifications: user.certifications,
        achievements: user.achievements,

        socialLinks: {
            github: user.socialLinks?.github,
            linkedin: user.socialLinks?.linkedin,
            portfolio: user.socialLinks?.portfolio,
            twitter: user.socialLinks?.twitter,
            devto: user.socialLinks?.devto,
            medium: user.socialLinks?.medium,
            leetcode: user.socialLinks?.leetcode
        }
    };


    const pdfBuffer=await generateResumePDF({resume, jobDescription, selfDescription, profile})

    console.log("PDF generated, buffer size:", pdfBuffer.length);

    const publicId=`result_${interviewReportId}`;
    
    console.log("Uploading to Cloudinary:", publicId);

    const cloudinaryResult=await uploadPDFToCloudinary(pdfBuffer, publicId)

    console.log("Cloudinary result:", cloudinaryResult);

    interviewReport.pdf = {
        url: cloudinaryResult.secure_url,
        storageKey: cloudinaryResult.public_id,
        generatedAt: new Date()
    };

    await interviewReport.save();

    return res.status(200).json({
        success: true,
        pdfUrl: cloudinaryResult.secure_url,
        generatedAt: interviewReport.pdf.generatedAt,
        alreadyGenerated: false
    });
})


const deleteReport=asyncHandler(async (req, res)=>{
    const userId=req.user.id;
    const {reportId}=req.params;

    const report=await InterviewReport.findOneAndDelete({
        _id: reportId,
        user: userId
    })

    if(!report){
        throw new ApiError(404, "Report not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            null,
            "Report deleted successfully"
        )
    )


})

export  {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    deleteReport
};