import { useContext, useEffect } from "react";

import {
    generateInterviewReport,
    getInterviewReportById,
    getAllInterviewReports,
    downloadResumePDF,
    deleteReport
} from "../interview/services/interview.api.js";

import { InterviewContext } from "../interview/interview.context.jsx";

export const useInterview = () => {

    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be within an InterviewProvider"
        );
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

            console.error("Generate report error:", error);

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

            console.error("Get report error:", error);

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

            console.log("ALL REPORTS RESPONSE:", response);

            const interviewReports = response?.data ?? [];

            setReports(interviewReports);

            return interviewReports;

        } catch (error) {

            console.error("Get all reports error:", error);

            throw error;

        } finally {

            setLoading(false);

        }
    };

    const handleDeleteReport=async (reportId)=>{
        try {
            await deleteReport(reportId);
            setReports((prev)=>
            prev.filter(
                (report)=>report._id !== reportId
            ));

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // Download Resume PDF
    const generateResume = async (interviewReportId) => {

        setLoading(true);

        try {

            await downloadResumePDF(interviewReportId);

        } catch (error) {

            console.error(
                "Resume PDF generation error:",
                error
            );

            throw error;

        } finally {

            setLoading(false);

        }
    };


    // Load all reports
    useEffect(() => {

        getAllReports();

    }, []);


    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getAllReports,
        generateResume,
        handleDeleteReport,
    };
};