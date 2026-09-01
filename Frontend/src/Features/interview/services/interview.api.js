import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});


// ======================================================
// Generate Interview Report
// ======================================================

export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
    experienceLevel,
    interviewType,
}) => {

    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);
    formData.append("experienceLevel", experienceLevel);
    formData.append("interviewType", interviewType);

    const response = await api.post(
        "/api/interview/",
        formData
    );

    return response.data;
};


// ======================================================
// Get Interview Report By ID
// ======================================================

export const getInterviewReportById = async (interviewId) => {

    const response = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return response.data;
};


// ======================================================
// Get All Interview Reports
// ======================================================

export const getAllInterviewReports = async () => {

    const response = await api.get(
        "/api/interview/reports"
    );

    return response.data;
};


// ======================================================
// Download Resume PDF
// ======================================================

export const generateResumePDF = async (interviewReportId) => {

    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`
    );

    return response.data;
};

export const downloadResumePDF = async (pdfUrl, interviewReportId) => {

    const response = await fetch(pdfUrl);

    if (!response.ok) {
        throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `resume_${interviewReportId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
};

export const deleteReport=async (reportId)=>{
    const response=await api.delete(
        `/api/interview/reports/${reportId}`
    )
    return response.data;
}


export const evaluateMockAnswer = async ({
    mockInterviewId,
    question,
    answer
}) => {

    console.log("API EVALUATE PAYLOAD:", {
        mockInterviewId,
        question,
        answer
    });

    const response = await api.post(
        "/api/interview/mock/evaluate",
        {
            mockInterviewId,
            question,
            answer
        }
    );

    return response.data;
};

export const startMockInterview = async (
    interviewReportId
) => {

    const response = await api.post(
        "/api/interview/mock/start",
        {
            interviewReportId
        }
    );

    return response.data;
};


export const getMockInterviewById = async (mockInterviewId) => {

    const response = await api.get(
        `/api/interview/mock/${mockInterviewId}`
    );

    return response.data;
};

export const getMyMockInterviews = async () => {

    const response = await api.get(
        "/api/interview/mock"
    );

    return response.data;
};