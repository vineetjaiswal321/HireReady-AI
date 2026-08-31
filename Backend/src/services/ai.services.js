import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import puppeteer from "puppeteer"


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number()
        .min(0)
        .max(100)
        .describe(
            "A score from 0 to 100 representing how well the candidate matches the job description"
        ),
    technicalQuestions: z.array(
        z.object({
            question: z.string().describe(
                "The technical question that can be asked in the interview"
            ),
            intention: z.string().describe(
                "The intention of the interviewer behind asking this question"
            ),
            answer: z.string().describe(
                "How to answer this question, what points to cover, and what approach to take"
            )
        })
    ).describe(
        "Technical questions that can be asked in the interview along with their intention and answer"
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe(
                "The behavioral question that can be asked in the interview"
            ),
            intention: z.string().describe(
                "The intention of the interviewer behind asking this question"
            ),
            answer: z.string().describe(
                "How to answer this question, what points to cover, and what approach to take"
            )
        })
    ).describe(
        "Behavioral questions that can be asked in the interview along with their intention and answer"
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe(
                "The skill which the candidate is lacking"
            ),
            severity: z.enum(["low", "medium", "high"]).describe(
                "The severity of this skill gap"
            )
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe(
                "The day number in the preparation plan, starting from 1"
            ),
            focus: z.string().describe(
                "The main focus of this day in the preparation plan"
            ),
            tasks: z.array(z.string()).describe(
                "List of tasks to be done on this day to prepare for the interview"
            )
        })
    ).describe(
        "A day-wise preparation plan for the candidate to follow"
    ),
    title : z.string().describe("The title of the job for which the interview report is generated")

});


const generateInterviewReport = async ({ resume, selfDescription, jobDescription,
    experienceLevel,
    interviewType }) => {

const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate's resume, self-description, and target job description.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

EXPERIENCE LEVEL:
${experienceLevel}

INTERVIEW TYPE:
${interviewType}

Generate a highly personalized interview preparation report.

Requirements:

1. Calculate a matchScore from 0 to 100 based on:
   - Required skills
   - Preferred skills
   - Candidate experience
   - Responsibilities
   - Technical stack
   - Candidate's demonstrated projects

2. Extract the target job title from the job description
   and return it as "title".

3. Generate exactly 5 technical questions.

Each technical question must include:
- question
- intention
- answer

Questions should be relevant to the candidate's resume,
experience level, and target role.

4. Generate exactly 3 behavioral questions.

Each behavioral question must include:
- question
- intention
- answer

At least one behavioral question should be based on
the candidate's actual project or experience when possible.

5. Identify realistic skill gaps by comparing the candidate's
resume against the required and preferred skills.

For each skill gap provide:
- skill
- severity

Severity must be one of:
- low
- medium
- high

Do not mark a skill as a gap if the resume clearly demonstrates
that the candidate already has that skill.

6. Generate exactly 7 preparation days.

Every day must contain:
- day
- focus
- tasks

Every day must contain 3 to 5 actionable tasks.

7. Do not return empty arrays.

8. Do not invent experience, projects, technologies,
achievements, or skills that are not supported by the resume
or self-description.

9. Tailor the questions and preparation plan to the
candidate's experience level.

10. Tailor the interview to the requested interview type.

11. Return only valid JSON matching the provided schema.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    });

    const result = interviewReportSchema.parse(
        JSON.parse(response.text)
    );

    // console.dir(result);

    return result;
};


const generatePdfFromHtml = async (htmlContent) => {

    const browser = await puppeteer.launch({
        headless: true
    });

    try {

        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;

    } finally {

        await browser.close();

    }
};

const generateResumePDF = async ({
    resume,
    selfDescription,
    jobDescription
}) => {

    const resumePdfSchema = z.object({
        html: z.string().describe(
            "The HTML content of the resume which can be converted to PDF using a library like Puppeteer"
        )
    });

    const prompt = `
        You are an expert resume writer and ATS resume designer.

        Create a professional, ATS-friendly resume tailored specifically
        to the provided job description.

        SOURCE RESUME:
        ${resume}

        SELF DESCRIPTION:
        ${selfDescription}

        JOB DESCRIPTION:
        ${jobDescription}

        Rules:

        1. Use ONLY information present in the source resume and
        self-description.

        2. Never invent or fabricate personal information, experience,
        projects, education, skills, achievements, certifications,
        links, dates, or metrics.

        3. If information is unavailable, omit that field instead of
        creating placeholder information.

        4. Preserve the candidate's real identity and contact information.

        5. Tailor the professional summary toward the target job.

        6. Prioritize skills that are actually present in the candidate's
        resume and relevant to the job description.

        7. Rewrite project descriptions using strong action-oriented
        language while preserving the original facts.

        8. Do not claim that the candidate has experience with a technology
        merely because it appears in the job description.

        9. Use an ATS-friendly structure:

        NAME
        Contact Information

        PROFESSIONAL SUMMARY

        TECHNICAL SKILLS

        EXPERIENCE
        (only if experience exists)

        PROJECTS
        (only if projects exist)

        EDUCATION

        CERTIFICATIONS / ACHIEVEMENTS
        (only if present)

        10. Keep the resume concise and professional, preferably 1 page
            for an entry-level candidate.

        11. Use clean HTML suitable for conversion to PDF.

        12. Do not include markdown.

        13. Do not include explanations outside the HTML.

        Return JSON with exactly one field:

        {
        "html": "..."
        }
        `;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(resumePdfSchema)
        }
    });

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer=await generatePdfFromHtml(jsonContent.html)


    return pdfBuffer
};


export {
    generateInterviewReport,
    generateResumePDF
};