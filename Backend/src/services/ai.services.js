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

        // Set A4 viewport
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 1
        });

        // Load generated HTML
        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        await page.emulateMediaType("print");

        // Wait for fonts/images/layout to finish
        await page.evaluate(async () => {
            if (document.fonts) {
                await document.fonts.ready;
            }

            const images = Array.from(document.images);

            await Promise.all(
                images.map((img) => {
                    if (img.complete) return Promise.resolve();

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );
        });

        // Force A4 page styling
        await page.addStyleTag({
            content: `
                @page {
                    size: A4;
                    margin: 15mm;
                }

                html,
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                }

                * {
                    box-sizing: border-box;
                }

                section {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
            `
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",

            printBackground: true,

            displayHeaderFooter: false,

            preferCSSPageSize: false,

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
    jobDescription,
    profile
}) => {

    const resumePdfSchema = z.object({
        html: z.string().describe(
            "Complete HTML document containing the ATS-friendly resume"
        )
    });

const prompt = `
You are an expert resume writer and HTML/CSS engineer. Generate a complete, ATS-friendly, ONE-PAGE(Mandatory) resume as a single self-contained HTML document. The VISUAL DESIGN must replicate the exact layout style described below. Content should be tailored to the job description using only facts from the resume/profile — never invented.

=== INPUT DATA ===

--- EXISTING RESUME (source of truth for facts, links, structure) ---
${resume}

--- CANDIDATE SELF DESCRIPTION (tone reference for summary only, do not copy verbatim) ---
${selfDescription}

--- TARGET JOB DESCRIPTION (tailor emphasis/keywords to this, never fabricate) ---
${jobDescription}

--- STRUCTURED PROFILE DATA (JSON — authoritative for contact info, links, education, skills) ---
${JSON.stringify(profile)}

=== EXACT VISUAL DESIGN SPEC ===

1. HEADER
   - Full name, centered, ALL CAPS, bold, 24-26px, slight letter-spacing.
   - Directly below: one centered line — phone | email | LinkedIn | GitHub | location — separated by " | ". Each that exists as a real link renders as a clickable <a>; otherwise plain text. 10.5-11px, not bold.
   - Thin horizontal rule (1px, dark gray/black) directly under this line, full width.

2. SECTION HEADERS
   - ALL CAPS, bold, 14-15px, single consistent accent color (e.g. #1a3d5c) for every header.
   - Thin bottom border (1px solid) under each header, full content width.
   - Order: PROFESSIONAL SUMMARY → EDUCATION → TECHNICAL SKILLS → PROJECTS → ACHIEVEMENTS → CERTIFICATIONS. Skip sections with no content — no placeholders.
   - Slightly more space above each header than below it, matching a dense single-page CV rhythm.

3. EDUCATION BLOCK
   - Institution name (bold), city/location right-aligned on the same line (flex row).
   - Degree name on next line, left; "CGPA: X | Expected: Month Year" right-aligned on the same line (flex row).

4. TECHNICAL SKILLS
   - One line per category: "Category Name: " bold, then comma-separated plain-text skills. No bullet dots, just stacked lines.

5. PROJECTS
   - Project title bold, followed by an italic/gray tag (hackathon name, "Personal Project, Year") on the same line.
   - If a real GitHub/live link exists in source data, make the title itself a clickable <a> (accent color, no underline) or add a small inline "[GitHub]" link — whichever the source data supports.
   - Bullets (•) below, action-verb led, tight spacing.
   - Final line per project: "Tech: " bold/italic, then comma-separated stack, slightly gray (#333).
   - Choose best 3 projects to showcase, max 4 bullets per project, prioritize relevance to job description.

6. ACHIEVEMENTS / CERTIFICATIONS
   - Simple bullet (•) list, one line per item where possible.

7. GLOBAL STYLING
   - Font: clean system sans-serif stack ("Arial, Helvetica, sans-serif") only — no external/Google fonts (network calls fail during PDF render).
   - Body text color #1a1a1a. One accent color only (e.g. #1a3d5c) for headers, borders, and all links — no default blue, no underline on links.
   - Compact but READABLE — small section gaps, not small text (see FONT SIZE RULES below, which override any "dense" instinct).
   - No icons, no images, no tables-for-layout — semantic HTML only (<header>, <section>, <h1>, <h2>, <ul><li>, <a>, flex rows for right-aligned date/location pattern).

=== FONT SIZE RULES (STRICT) ===
- Body text (bullets, skills lines, project descriptions): 11.5px minimum, 12px preferred. NEVER below 11px.
- Name: 24-28px bold.
- Section headers: 18-19px bold uppercase.
- Contact/links line: 13.5-14px minimum.
- "Tech:" lines and project tags/dates: 12.5px minimum.
- Line-height for body text: 1.4-1.45 minimum (never tighter than 1.3 even when compressing).
- Define sizes in a way that keeps them consistent (e.g. body { font-size: 13.5px; } with headers/name sized relative to it) — do not let bullet text silently shrink smaller than everything else.

=== FITTING ON ONE PAGE — PRIORITY ORDER ===
If content overflows one A4 page, fix it IN THIS ORDER — do not skip ahead:
1. Reduce vertical margin/padding between sections (14px → 10px → 8px).
2. Reduce line-height slightly (1.45 → 1.35, never below 1.3).
3. Tighten spacing between bullet <li> items.
4. Trim to the most relevant/impactful bullets per project (max 3-4 per project) rather than keeping everything.
5. ONLY as an absolute last resort, reduce body font by half a point (11.5px → 11px). Never below 11px.
Font size is NEVER sacrificed to fit more content. Fewer, sharper bullets at readable size beats a cramped tiny-font resume.

=== LINKS RULE ===
- Scan resume text + profile JSON for: GitHub, LinkedIn, LeetCode, GeeksforGeeks/GFG, HackerRank, Codeforces, portfolio site, email, phone.
- Every link that genuinely exists becomes a real <a href="FULL_URL" target="_blank" rel="noopener">Label</a>. Email → mailto:, phone → tel:.
- If only a handle exists (no full URL), construct the standard profile URL ONLY if the platform is unambiguous (github.com/username, linkedin.com/in/username, leetcode.com/username, geeksforgeeks.org/user/username). Otherwise leave as plain text.
- NEVER fabricate a link with no basis in source data.
- All links use the single accent color, no underline.
- Add link of leetcode profile, gfg profile, coding ninjas profile, codeforces profile, hackerrank profile, portfolio site if they exist in the resume/profile data.(Mandatory) 

=== CONTENT RULES ===
1. Never invent employers, dates, metrics, or skills. Rephrase/reorder existing content only to match the job description.
2. Professional Summary: 2-3 sentences, professional tone (no "I"), informed by self description but not copied verbatim.
3. Prioritize skills/bullets most relevant to the job description first within each section.
4. Weave in exact job-description keywords only where truthfully supported by source data.
5. Quantify bullets only where source data already has numbers — never add new ones.
6. Shrink or remove bullets only if necessary to fit on one page, but never invent new content.(Necessory to fit on one page, but never invent new content.)
7. Can reduce margin/padding between sections, line-height, and bullet spacing to fit on one page, but never reduce font size below 11px.(Mandatory)

=== HTML/CSS OUTPUT RULES (Puppeteer PDF constraints) ===
1. Return ONE complete HTML document: <!DOCTYPE html>, <html>, <head> with a single inline <style> block. No external stylesheets/fonts.
2. Do NOT add margin/padding to <html> or <body> — the PDF renderer already applies 15mm margins on all sides.
3. Add "page-break-inside: avoid;" on each <section>.
4. Text must remain real, selectable HTML text (not images) for ATS parsing.

=== OUTPUT FORMAT ===
Return ONLY JSON matching the provided schema — the "html" field contains the full HTML document as a string. No markdown fences, no commentary outside the JSON.
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

    if (!jsonContent.html) {
        throw new Error(
            "AI failed to generate resume HTML"
        );
    }

    const pdfBuffer=await generatePdfFromHtml(jsonContent.html)


    return pdfBuffer
};


const evaluateMockAnswer = async ({
    question,
    answer,
    experienceLevel,
    interviewType
}) => {


    const mockAnswerEvaluationSchema = z.object({
    score: z.number().min(0).max(100),

    feedback: z.string(),

    strengths: z
        .array(z.string())
        .min(1),

    improvements: z
        .array(z.string())
        .min(1)

    })

    const prompt = `
You are an expert technical interviewer and career coach.

Evaluate the candidate's answer to the interview question.

INTERVIEW TYPE:
${interviewType}

EXPERIENCE LEVEL:
${experienceLevel}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate the answer fairly and realistically.

Consider:

1. Accuracy
   - Is the answer technically correct?
   - Are there factual errors?

2. Relevance
   - Does the answer directly address the question?
   - Does it avoid unnecessary information?

3. Depth
   - Does the answer demonstrate sufficient understanding
     for the candidate's experience level?

4. Clarity
   - Is the explanation easy to understand?
   - Is the response logically structured?

5. Practical understanding
   - Does the candidate provide examples,
     use cases, trade-offs, or real-world reasoning
     when appropriate?

6. Interview quality
   - Would this answer be considered strong
     in a real interview?

SCORING:

90-100:
Exceptional answer. Accurate, deep, clear, and interview-ready.

75-89:
Strong answer with only minor areas for improvement.

60-74:
Good understanding but has noticeable gaps.

40-59:
Partial understanding with significant weaknesses.

0-39:
Poor, incorrect, or largely incomplete answer.

IMPORTANT:

- Judge the answer according to the candidate's experience level.
- Don't response as The candidate, but as an interviewer evaluating the answer, u can say You provided a good answer, but you could improve by...
- (Important) Avoid using "The Candidate" in your feedback. Instead, use "You" to address the candidate directly.
- Do not penalize a junior candidate for not giving
  senior-level depth.
- Do not invent information about the candidate.
- Do not assume knowledge that is not present in the answer.
- Give constructive and actionable feedback.
- Identify the strongest aspects of the answer.
- Identify the most important improvements.
- Do not give generic feedback.

Return only valid JSON matching the provided schema.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents: prompt,

        config: {
            responseMimeType: "application/json",

            responseJsonSchema:
                z.toJSONSchema(
                    mockAnswerEvaluationSchema
                )
        }
    });

    const result =
        mockAnswerEvaluationSchema.parse(
            JSON.parse(response.text)
        );

    return result;
};


export {
    generateInterviewReport,
    generateResumePDF,
    evaluateMockAnswer
};