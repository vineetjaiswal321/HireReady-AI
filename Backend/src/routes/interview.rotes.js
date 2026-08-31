import express from "express";

import { authUser } from "../middlewares/auth.middlewares.js";

import {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
} from "../controllers/interview.controllers.js";

import upload from "../middlewares/file.middlewares.js";

const interviewRouter = express.Router();


// Generate interview report
interviewRouter.post(
    "/",
    authUser,
    upload.single("resume"),
    generateInterviewReportController
);


// Get one interview report
interviewRouter.get(
    "/report/:interviewId",
    authUser,
    generateInterviewReportByIdController
);


// Get all interview reports
interviewRouter.get(
    "/reports",
    authUser,
    getAllInterviewReportsController
);


interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController)

export default interviewRouter;