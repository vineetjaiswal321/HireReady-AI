import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib"; 


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
        model: "gemini-3.6-flash-lite",
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


/**
 * A4 @ 96dpi geometry.
 * IMPORTANT: both the WIDTH and HEIGHT used for on-screen measurement
 * must reflect the *printable* content box (page size minus margins),
 * because Chromium's print pipeline reflows text using that narrower
 * box, not the full page box. Measuring at full page width silently
 * under-estimates wrapped-text height and is the root cause of the
 * intermittent "sometimes 2 pages" bug.
 */
const MM_TO_PX = 3.7795275591;
const A4_WIDTH_PX = Math.round(210 * MM_TO_PX);   // 794
const A4_HEIGHT_PX = Math.round(297 * MM_TO_PX);  // 1123
const MARGIN_PX = Math.round(14 * MM_TO_PX);      // ~57
const A4_USABLE_WIDTH = A4_WIDTH_PX - MARGIN_PX * 2;   // ~680
const A4_USABLE_HEIGHT = A4_HEIGHT_PX - MARGIN_PX * 2; // ~1009 (same value you already had)

const getContentHeight = async (page) => {
    return await page.evaluate(() => {
        const body = document.body;
        const elements = Array.from(body.querySelectorAll("*"));
        let maxBottom = 0;
        for (const element of elements) {
            const rect = element.getBoundingClientRect();
            if (rect.height > 0) {
                maxBottom = Math.max(maxBottom, rect.bottom);
            }
        }
        return Math.ceil(maxBottom);
    });
};

const getPdfPageCount = async (pdfBuffer) => {
    const doc = await PDFDocument.load(pdfBuffer);
    return doc.getPageCount();
};

const COMPACT_STYLE_LEVEL_1 = `
    section {
        margin-top: 8px !important;
        margin-bottom: 4px !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    h1 {
        margin-top: 0 !important;
        margin-bottom: 3px !important;
    }

    h2 {
        margin-top: 8px !important;
        margin-bottom: 3px !important;
    }

    p {
        margin-top: 2px !important;
        margin-bottom: 3px !important;
    }

    ul {
        margin-top: 2px !important;
        margin-bottom: 3px !important;
        padding-left: 18px !important;
    }

    li {
        margin-top: 0 !important;
        margin-bottom: 2px !important;
    }

    header {
        margin-bottom: 4px !important;
    }
`;

// A second, more aggressive compaction pass used ONLY if level 1 plus
// the real PDF page-count check still shows overflow. This still never
// touches font-size, per the "never below 12px" hard rule.
const COMPACT_STYLE_LEVEL_2 = `
    section { margin-top: 5px !important; margin-bottom: 2px !important; }
    h1 { margin-bottom: 2px !important; }
    h2 { margin-top: 5px !important; margin-bottom: 2px !important; }
    p { margin-top: 1px !important; margin-bottom: 2px !important; }
    ul { margin-top: 1px !important; margin-bottom: 2px !important; padding-left: 16px !important; }
    li { margin-bottom: 1px !important; line-height: 1.25 !important; }
    header { margin-bottom: 2px !important; }
`;

const generatePdfFromHtml = async (htmlContent) => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    try {
        const page = await browser.newPage();

        // FIX: measure at the *usable* content width (page width minus
        // left+right margins), matching what the print pass will actually
        // use for text reflow. Using the full page width here was the
        // root cause of the intermittent 2-page overflow.
        await page.setViewport({
            width: A4_USABLE_WIDTH,
            height: A4_HEIGHT_PX,
            deviceScaleFactor: 1,
        });

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0",
        });

        await page.emulateMediaType("print");

        // Wait for fonts and images
        await page.evaluate(async () => {
            if (document.fonts) {
                await document.fonts.ready;
            }

            const images = Array.from(document.images);

            await Promise.all(
                images.map((img) => {
                    if (img.complete) {
                        return Promise.resolve();
                    }

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );
        });

        await page.addStyleTag({
            content: `
                @page {
                    size: A4;
                    margin: 15mm;
                }

                html {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                }

                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                    box-sizing: border-box;
                    overflow: visible !important;
                }

                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                }

                section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                    cursor: pointer;
                }
            `,
        });

        let contentHeight = await getContentHeight(page);

        console.log(
            `Resume height before fitting (measured at usable width ${A4_USABLE_WIDTH}px): ${contentHeight}px`
        );

        let compactionLevel = 0;

        /*
         * If content exceeds one A4 page, progressively compact
         * spacing before touching font size.
         *
         * This preserves readability much better than immediately
         * scaling the entire document.
         */
        if (contentHeight > A4_USABLE_HEIGHT) {
            await page.addStyleTag({
                content: COMPACT_STYLE_LEVEL_1,
            });

            await page.evaluate(() => {
                document.body.offsetHeight;
            });

            compactionLevel = 1;
            contentHeight = await getContentHeight(page);

            console.log(
                `Resume height after spacing compression (level 1): ${contentHeight}px`
            );
        }

        if (contentHeight > A4_USABLE_HEIGHT) {
            await page.addStyleTag({
                content: COMPACT_STYLE_LEVEL_2,
            });

            await page.evaluate(() => {
                document.body.offsetHeight;
            });

            compactionLevel = 2;
            contentHeight = await getContentHeight(page);

            console.log(
                `Resume height after spacing compression (level 2): ${contentHeight}px`
            );
        }

        const pdfOptions = {
            format: "A4",
            printBackground: true,
            displayHeaderFooter: false,
            preferCSSPageSize: true,
        };

        let pdfBuffer = await page.pdf(pdfOptions);

        /*
         * FIX: don't rely solely on the DOM-height heuristic above (it
         * can still be off due to font metrics, rounding, etc). Verify
         * against the ACTUAL rendered PDF page count — this is ground
         * truth. If it still overflows and we haven't hit max
         * compaction yet, escalate once more and re-render.
         */
        let pageCount = await getPdfPageCount(pdfBuffer);

        console.log(
            `Rendered PDF page count: ${pageCount} (compaction level ${compactionLevel})`
        );

        if (pageCount > 1 && compactionLevel < 2) {
            await page.addStyleTag({
                content: COMPACT_STYLE_LEVEL_2,
            });

            await page.evaluate(() => {
                document.body.offsetHeight;
            });

            pdfBuffer = await page.pdf(pdfOptions);
            pageCount = await getPdfPageCount(pdfBuffer);

            console.log(
                `Rendered PDF page count after escalation: ${pageCount}`
            );
        }

        /*
         * IMPORTANT:
         * Never hide the second page.
         *
         * If the content is still too large after reasonable
         * compaction, throw an error instead of silently clipping
         * the resume.
         */
        if (pageCount > 1) {
            throw new Error(
                `Resume content is too large to fit on one A4 page ` +
                `(rendered ${pageCount} pages even after maximum spacing ` +
                `compaction). The source content needs to be shortened ` +
                `before regenerating.`
            );
        }

        return pdfBuffer;

    } finally {
        await browser.close();
    }
};


/**
 * FIX: previously this only ever read profile.codingProfiles and only
 * covered 5 platforms, silently dropping github / linkedin / portfolio /
 * hackerrank even though the resume prompt's "SUPPORTED PLATFORMS" list
 * and strict-link rules explicitly cover them. Those links can live in
 * different places depending on how `profile` is shaped upstream, so
 * this checks several common locations and prefers the first non-empty
 * match. Not exported — it's purely an internal helper for
 * generateResumePDF, same as before.
 */
const pickUrl = (...candidates) => {
    for (const c of candidates) {
        if (typeof c === "string" && c.trim().length > 0) return c.trim();
    }
    return null;
};

const extractCodingProfileUrls = (profile) => {
    const codingProfiles = profile?.codingProfiles || {};
    const social = profile?.socialLinks || profile?.links || {};

    return {
        leetcode: pickUrl(codingProfiles.leetcode, profile?.leetcode, social.leetcode),
        geeksforgeeks: pickUrl(
            codingProfiles.geeksforgeeks,
            codingProfiles.gfg,
            profile?.geeksforgeeks,
            social.geeksforgeeks
        ),
        codechef: pickUrl(codingProfiles.codechef, profile?.codechef, social.codechef),
        codeforces: pickUrl(codingProfiles.codeforces, profile?.codeforces, social.codeforces),
        codingninjas: pickUrl(
            codingProfiles.codingninjas,
            codingProfiles.code360,
            profile?.codingninjas,
            social.codingninjas
        ),
        hackerrank: pickUrl(codingProfiles.hackerrank, profile?.hackerrank, social.hackerrank),
        // Previously missing entirely from the "verified" block:
        github: pickUrl(codingProfiles.github, profile?.github, social.github),
        linkedin: pickUrl(codingProfiles.linkedin, profile?.linkedin, social.linkedin),
        portfolio: pickUrl(
            codingProfiles.portfolio,
            profile?.portfolio,
            profile?.website,
            social.portfolio
        ),
    };
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

    // FIX: now includes github/linkedin/portfolio/hackerrank, pulled
    // from whichever field in `profile` actually holds them.
    const codingProfileUrls = extractCodingProfileUrls(profile);

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

=== VERIFIED PROFILE URLs (AUTHORITATIVE — use these EXACT values) ===

These URLs are taken DIRECTLY from the user's profile database, across
ALL known profile fields (coding platforms, GitHub, LinkedIn, portfolio).
A value of null means the candidate has NO verified profile for that
platform.

${JSON.stringify(codingProfileUrls, null, 2)}

STRICT RULE:

When a coding platform is mentioned anywhere in the resume, use the
corresponding URL from VERIFIED PROFILE URLs.

NEVER replace these URLs with the platform homepage.

For example, if:

leetcode = "https://leetcode.com/vineetjaiswal321"

then:

<a href="https://leetcode.com/vineetjaiswal321">LeetCode</a>

NOT:

<a href="https://leetcode.com/">LeetCode</a>

The href must be the exact value from VERIFIED PROFILE URLs.

If a platform's value above is null, do NOT create a link for it —
render the platform name as plain text only, and do NOT invent a URL
or username for it.

=== EXACT VISUAL DESIGN SPEC ===

1. HEADER
   - Full name, centered, ALL CAPS, bold, 24-26px, slight letter-spacing.
   - Directly below: one centered line — phone | email | LinkedIn | GitHub | location
    - 11px minimum, 12px preferred.
   - Thin horizontal rule (1px, dark gray/black) directly under this line, full width.

2. SECTION HEADERS
   - ALL CAPS, bold, 15px, single consistent accent color (e.g. #1a3d5c) for every header.
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
   - If an achievement mentions a coding platform such as LeetCode, CodeChef,
     HackerRank, GeeksforGeeks, Codeforces, etc., and the candidate's profile
     URL is available, make the platform name itself a clickable HTML link.
   - Example:
     • Solved 300+ problems on !important <a href="https://leetcode.com/username">LeetCode</a>
   - Do NOT render "LeetCode" or any other coding platform as plain text when
     its profile URL is available.
   - Do NOT display the raw URL.
   - Use the exact profile URL provided in the candidate's data codingProfiles object.

7. GLOBAL STYLING
   - Font: clean system sans-serif stack ("Arial, Helvetica, sans-serif") only — no external/Google fonts (network calls fail during PDF render).
   - Body text color #1a1a1a. One accent color only (e.g. #1a3d5c) for headers, borders, and all links — no default blue, no underline on links.
   - Compact but READABLE — small section gaps, not small text (see FONT SIZE RULES below, which override any "dense" instinct).
   - No icons, no images, no tables-for-layout — semantic HTML only (<header>, <section>, <h1>, <h2>, <ul><li>, <a>, flex rows for right-aligned date/location pattern).

=== FONT SIZE RULES (STRICT) ===
- Body text: 14.5px minimum, 15px preferred. NEVER below 13px.
- Name: 26-28.5px bold.
- Section headers: 18px bold uppercase.
- Contact/links line: 13-14px.
- Tech lines and project tags/dates: 13.5-14.5px.
- Line-height: 1.3-1.4.

=== STRICT ONE-PAGE REQUIREMENT ===

The final resume MUST fit completely on exactly ONE A4 page.

This is a hard requirement, not a preference.

The generated HTML must be designed specifically for:
A4 paper with 13mm margins on all sides. Because print reflow narrows
the usable text width to roughly 180mm (about 680px at 96dpi), keep
paragraph and bullet line lengths reasonably tight — avoid long
unbroken sentences that assume a wider column than that.

IMPORTANT:
- NEVER generate content that intentionally overflows onto page 2.
- NEVER create a second page.
- Keep all resume sections on the same single page.
- If the source contains too much content, intelligently remove the least relevant content.
- Prioritize content in this order:
  1. Professional Summary
  2. Education
  3. Technical Skills
  4. Most relevant Projects
  5. Achievements
  6. Certifications
- Select only the strongest and most job-relevant content.
- Maximum 3 projects.
- Maximum 3 bullets per project.
- Maximum 1 concise line per achievement where possible.
- Maximum 1 concise line per certification where possible.
- Professional Summary must be 2 concise sentences.
- Do NOT remove important facts merely to save space, but remove redundancy.
- NEVER reduce body font below 12px.
- Prefer shortening/rephrasing verbose descriptions over shrinking fonts.
- Use compact section spacing while maintaining readability.

Before returning the HTML, mentally verify that the complete document fits inside one A4 page.

=== CODING PROFILE LINKS — STRICT ===

Coding profile URLs MUST come from the VERIFIED PROFILE URLs block above
whenever it contains a URL for that platform.

The VERIFIED PROFILE URLs block is the authoritative source for coding
profile URLs.

SUPPORTED PLATFORMS:
- LeetCode
- GeeksforGeeks / GFG
- CodeChef
- Codeforces
- HackerRank
- Coding Ninjas / Code360
- GitHub
- LinkedIn
- Portfolio

STRICT RULES:

1. FIRST check VERIFIED PROFILE URLs.

2. If a URL exists there, use that EXACT URL.

3. NEVER construct a different URL when an exact URL is available.

4. NEVER use these generic URLs when a user's actual URL exists:
   https://leetcode.com/
   https://github.com/
   https://codechef.com/
   https://www.hackerrank.com/
   https://www.geeksforgeeks.org/
   https://codeforces.com/

5. Only construct a profile URL from a username/handle when the profile JSON
   contains a username/handle but does NOT contain a full URL.

6. If both a username and full URL exist, ALWAYS prefer the full URL. !important

7. The visible platform name MUST be wrapped in a real HTML <a> element.

8. This rule applies EVERYWHERE the platform is mentioned, including:
   - Header/contact section
   - Achievements
   - Certifications
   - Projects
   - Experience
   - Any other resume section

9. The href MUST point directly to the user's profile, NOT the platform
   homepage.

10. NEVER invent a username, profile URL, or profile.

11. If a platform's value in VERIFIED PROFILE URLs is null, do NOT link
    it — render the platform name as plain text only.

!important
EXAMPLE:

If VERIFIED PROFILE URLs contains:

"leetcode": "https://leetcode.com/vineetjaiswal321"

then generate:

<a href="https://leetcode.com/vineetjaiswal321">LeetCode</a>

NOT:

<a href="https://leetcode.com/">LeetCode</a>

If the achievement says:

Solved 300+ problems on LeetCode

generate:

<li>
  Solved 300+ problems on
  <a href="https://leetcode.com/vineetjaiswal321">LeetCode</a>
</li>

The href must ALWAYS be the candidate's actual profile URL from the
VERIFIED PROFILE URLs block whenever one is available.

=== CONTENT RULES ===
1. Never invent employers, dates, metrics, or skills. Rephrase/reorder existing content only to match the job description.
2. Professional Summary: 2-3 sentences, professional tone (no "I"), informed by self description but not copied verbatim.
3. Prioritize skills/bullets most relevant to the job description first within each section.
4. Weave in exact job-description keywords only where truthfully supported by source data.
5. Quantify bullets only where source data already has numbers — never add new ones.
6. Shrink or remove bullets only if necessary to fit on one page, but never invent new content.(Necessory to fit on one page, but never invent new content.)
7. Can reduce margin/padding between sections, line-height, and bullet spacing to fit on one page, but never reduce font size below 13px.(Mandatory)

=== HTML/CSS OUTPUT RULES (Puppeteer PDF constraints) ===
1. Return ONE complete HTML document: <!DOCTYPE html>, <html>, <head> with a single inline <style> block. No external stylesheets/fonts.
2. Do NOT add margin/padding to <html> or <body> — the PDF renderer already applies 13mm margins on all sides.
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


    const links = jsonContent.html.match(
        /<a\b[^>]*href=["'][^"']+["'][^>]*>.*?<\/a>/gi
    );


    // Sanity check: warn (don't fail) if a verified, non-null URL never
    // made it into the generated HTML at all — helps catch prompt-
    // adherence regressions early, e.g. GitHub/LinkedIn getting dropped.
    for (const [platform, url] of Object.entries(codingProfileUrls)) {
        if (url && !jsonContent.html.includes(url)) {
            console.warn(
                `WARNING: verified ${platform} URL (${url}) was not found ` +
                `anywhere in the generated resume HTML.`
            );
        }
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