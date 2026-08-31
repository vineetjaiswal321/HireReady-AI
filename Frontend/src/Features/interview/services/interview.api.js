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

export const downloadResumePDF = async (interviewReportId) => {

    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`,
        null,
        {
            responseType: "blob"
        }
    );

    const blob = new Blob(
        [response.data],
        {
            type: "application/pdf"
        }
    );

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
