import express from "express";

import { authUser } from "../middlewares/auth.middlewares.js";

import {
    generateInterviewReportController,
    generateInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    deleteReport
} from "../controllers/interview.controllers.js";

import { 
    evaluateMockAnswerController, 
    startMockInterviewController,
    getMockInterviewByIdController,
    getMyMockInterviewsController
} from "../controllers/mockInterview.controllers.js";

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

interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    authUser, 
    generateResumePdfController
)

interviewRouter.delete(
    "/reports/:reportId",
    authUser,
    deleteReport
);

interviewRouter.post(
    "/mock/evaluate",
    authUser,
    evaluateMockAnswerController
);


interviewRouter.post(
    "/mock/start",
    authUser,
    startMockInterviewController
);

interviewRouter.get(
    "/mock",
    authUser,
    getMyMockInterviewsController
);

interviewRouter.get(
    "/mock/:mockInterviewId",
    authUser,
    getMockInterviewByIdController
);



export default interviewRouter;