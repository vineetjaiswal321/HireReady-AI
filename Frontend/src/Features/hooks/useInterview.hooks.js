import { useContext, useEffect } from "react";

import {
    generateInterviewReport,
    getInterviewReportById,
    getAllInterviewReports,
    generateResumePDF,
    downloadResumePDF,
    deleteReport,
    evaluateMockAnswer
} from "../interview/services/interview.api.js";

import { InterviewContext } from "../interview/interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be within an InterviewProvider");
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    // Generate report
    const generateReport = async ({
        jobDescription,
        selfDescription,
        resumeFile,
        experienceLevel,
        interviewType
    }) => {
        setLoading(true);

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile,
                experienceLevel,
                interviewType
            });

            const interviewReport = response.data;

            setReport(interviewReport);

            return interviewReport;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Get report by ID
    const getReportById = async (interviewId) => {
        setLoading(true);

        try {
            const response = await getInterviewReportById(interviewId);

            setReport(response.data);

            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Get all reports
    const getAllReports = async () => {
        setLoading(true);

        try {
            const response = await getAllInterviewReports();

            const interviewReports = response?.data ?? [];

            setReports(interviewReports);

            return interviewReports;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReport = async (reportId) => {
        try {
            await deleteReport(reportId);
            setReports((prev) =>
                prev.filter((report) => report._id !== reportId)
            );
        } catch (error) {
            throw error;
        }
    };

    // Download Resume PDF
    const generateResume = async (interviewReportId) => {
        setLoading(true);

        try {
            const response = await generateResumePDF(interviewReportId);

            // Update current report with PDF information
            setReport((prev) => ({
                ...prev,
                pdf: {
                    url: response.pdfUrl,
                    generatedAt: response.generatedAt
                }
            }));

            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const downloadResume = async (interviewReportId, pdfUrl) => {
        try {
            await downloadResumePDF(pdfUrl, interviewReportId);
        } catch (error) {
            throw error;
        }
    };

    // Load all reports
    useEffect(() => {
        getAllReports();
    }, []);

    const evaluateAnswer = async ({
        mockInterviewId,
        question,
        answer
    }) => {
        try {
            setLoading(true);

            const response = await evaluateMockAnswer({
                mockInterviewId,
                question,
                answer
            });

            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports,
        generateResume,
        downloadResume,
        handleDeleteReport,
        evaluateAnswer
    };
};