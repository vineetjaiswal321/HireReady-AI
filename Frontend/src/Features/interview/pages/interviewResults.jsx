import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMockInterviewById } from "../services/interview.api.js";


const InterviewResults = () => {
    const navigate = useNavigate();
    const { mockInterviewId } = useParams();

    const [mockInterview, setMockInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMockInterview = async () => {
            try {
                setLoading(true);

                const response = await getMockInterviewById(mockInterviewId);

                console.log("Mock interview result:", response);

                setMockInterview(response.data);
            } catch (error) {
                console.error("Failed to fetch mock interview:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load interview result"
                );
            } finally {
                setLoading(false);
            }
        };

        if (mockInterviewId) {
            fetchMockInterview();
        }
    }, [mockInterviewId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#08080d] text-white">
                <p className="text-zinc-400">
                    Loading interview result...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#08080d] text-white">
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    if (!mockInterview) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#08080d] text-white">
                <p className="text-zinc-400">
                    Interview result not found.
                </p>
            </div>
        );
    }

    const answers = mockInterview.answers || [];

    const interviewReport = mockInterview.interviewReport;

    const interviewReportId = interviewReport?._id;
    /*
     * Calculate score from evaluations.
     *
     * Adjust these fields according to the exact
     * response returned by your evaluateAnswer API.
     */
    const scores = answers
        .map((item) => item.score)
        .filter((score) => typeof score === "number");

    const overallScore =
        mockInterview.overallScore ??
        (scores.length > 0
            ? Math.round(
                scores.reduce((sum, score) => sum + score, 0) /
                    scores.length
            )
            : 0);
            

    const getScoreLabel = (score) => {
        if (score >= 85) return "Excellent";
        if (score >= 70) return "Strong";
        if (score >= 50) return "Good";
        if (score >= 35) return "Needs Improvement";
        return "Needs Practice";
    };

    const getScoreColor = (score) => {
        if (score >= 70) return "text-emerald-400";
        if (score >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="min-h-screen bg-[#08080d] text-white">

            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="
                    absolute
                    -top-40
                    left-1/2
                    h-96
                    w-96
                    -translate-x-1/2
                    rounded-full
                    bg-violet-600/10
                    blur-[120px]
                " />

                <div className="
                    absolute
                    right-0
                    top-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-indigo-600/10
                    blur-[100px]
                " />
            </div>

            <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">

                {/* ===================================== */}
                {/* HEADER */}
                {/* ===================================== */}

                <div className="mb-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="
                            mb-6
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            text-zinc-500
                            transition
                            hover:text-white
                        "
                    >
                        <span className="text-lg">←</span>
                        Back to Interview
                    </button>

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                        <div>
                            <div className="
                                mb-2
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-violet-400
                            ">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                AI Interview Results
                            </div>

                            <h1 className="
                                text-3xl
                                font-bold
                                tracking-tight
                                md:text-4xl
                            ">
                                Your Interview Performance
                            </h1>

                            <p className="
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-relaxed
                                text-zinc-400
                                md:text-base
                            ">
                                Review your answers, understand your strengths,
                                and identify where you can improve.
                            </p>
                        </div>

                        <div className="
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border border-emerald-400/20
                            bg-emerald-500/10
                            px-3.5
                            py-2
                            text-xs
                            font-medium
                            text-emerald-400
                        ">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Interview Completed
                        </div>

                    </div>
                </div>


                {/* ===================================== */}
                {/* SCORE HERO */}
                {/* ===================================== */}

                <div className="
                    mb-6
                    overflow-hidden
                    rounded-3xl
                    border border-white/10
                    bg-gradient-to-br
                    from-violet-500/[0.09]
                    via-white/[0.03]
                    to-indigo-500/[0.06]
                ">

                    <div className="
                        grid
                        md:grid-cols-[280px_1fr]
                    ">

                        {/* Score */}
                        <div className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            border-b
                            border-white/10
                            p-8
                            md:border-b-0
                            md:border-r
                        ">

                            <div className="relative flex h-40 w-40 items-center justify-center">

                                <div className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    border
                                    border-violet-500/20
                                    bg-violet-500/5
                                " />

                                <div className="
                                    absolute
                                    inset-3
                                    rounded-full
                                    border
                                    border-white/5
                                " />

                                <div className="relative text-center">
                                    <p className="text-4xl font-bold">
                                        {overallScore}
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        / 100
                                    </p>
                                </div>

                            </div>

                            <p className={`
                                mt-4
                                text-sm
                                font-semibold
                                ${getScoreColor(overallScore)}
                            `}>
                                {getScoreLabel(overallScore)}
                            </p>

                            <p className="
                                mt-1
                                text-xs
                                text-zinc-500
                            ">
                                Overall Interview Score
                            </p>

                        </div>


                        {/* Score explanation */}
                        <div className="p-7 md:p-9">

                            <div className="mb-6">
                                <p className="
                                    text-sm
                                    font-semibold
                                    text-white
                                ">
                                    Performance Overview
                                </p>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-zinc-500
                                ">
                                    Here's how you performed across the
                                    interview.
                                </p>
                            </div>


                            <div className="
                                grid
                                grid-cols-2
                                gap-3
                                md:grid-cols-3
                            ">

                                <div className="
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    p-4
                                ">
                                    <p className="text-2xl font-bold text-white">
                                        {answers.length}
                                    </p>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-zinc-500
                                    ">
                                        Questions Answered
                                    </p>
                                </div>


                                <div className="
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    p-4
                                ">
                                    <p className="
                                        text-2xl
                                        font-bold
                                        text-emerald-400
                                    ">
                                        {scores.filter(
                                            (score) => score >= 70
                                        ).length}
                                    </p>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-zinc-500
                                    ">
                                        Strong Answers
                                    </p>
                                </div>


                                <div className="
                                    col-span-2
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    p-4
                                    md:col-span-1
                                ">
                                    <p className="
                                        text-2xl
                                        font-bold
                                        text-violet-400
                                    ">
                                        AI
                                    </p>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-zinc-500
                                    ">
                                        Powered Evaluation
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ===================================== */}
                {/* CONTENT GRID */}
                {/* ===================================== */}

                <div className="
                    grid
                    gap-6
                    lg:grid-cols-[1fr_320px]
                ">


                    {/* ================================= */}
                    {/* ANSWER REVIEW */}
                    {/* ================================= */}

                    <div className="
                        rounded-3xl
                        border border-white/10
                        bg-white/[0.025]
                        p-6
                        md:p-7
                    ">

                        <div className="
                            mb-6
                            flex
                            items-center
                            justify-between
                        ">

                            <div>
                                <h2 className="
                                    text-lg
                                    font-semibold
                                ">
                                    Answer Review
                                </h2>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-zinc-500
                                ">
                                    Detailed feedback from the AI interviewer
                                </p>
                            </div>

                            <span className="
                                rounded-lg
                                bg-white/5
                                px-2.5
                                py-1.5
                                text-xs
                                text-zinc-400
                            ">
                                {answers.length} answers
                            </span>

                        </div>


                        <div className="space-y-4">

                            {answers.length === 0 ? (

                                <div className="
                                    rounded-2xl
                                    border border-dashed
                                    border-white/10
                                    p-8
                                    text-center
                                ">
                                    <p className="text-sm text-zinc-400">
                                        No interview answers found.
                                    </p>
                                </div>

                            ) : (

                                answers.map((item, index) => {

                                    const score = item.score ?? 0;

                                    return (
                                        <div
                                            key={index}
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border border-white/10
                                                bg-black/20
                                            "
                                        >

                                            {/* Question header */}
                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                                border-b
                                                border-white/10
                                                p-5
                                            ">

                                                <div className="flex gap-3">

                                                    <span className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-violet-500/10
                                                        text-xs
                                                        font-bold
                                                        text-violet-400
                                                    ">
                                                        {String(index + 1).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>

                                                    <p className="
                                                        text-sm
                                                        font-medium
                                                        leading-relaxed
                                                        text-zinc-200
                                                    ">
                                                        {item.question}
                                                    </p>

                                                </div>

                                                <span className={`
                                                    shrink-0
                                                    rounded-lg
                                                    px-2.5
                                                    py-1.5
                                                    text-xs
                                                    font-semibold
                                                    ${
                                                        score >= 70
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : score >= 50
                                                            ? "bg-yellow-500/10 text-yellow-400"
                                                            : "bg-red-500/10 text-red-400"
                                                    }
                                                `}>
                                                    {score}/100
                                                </span>

                                            </div>


                                            {/* Answer */}
                                            <div className="p-5">

                                                <p className="
                                                    mb-2
                                                    text-[11px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-zinc-600
                                                ">
                                                    Your Answer
                                                </p>

                                                <p className="
                                                    text-sm
                                                    leading-7
                                                    text-zinc-400
                                                ">
                                                    {item.answer}
                                                </p>


                                                {/* Evaluation */}
                                                {item.feedback && (
                                                <div className="
                                                    mt-5
                                                    rounded-xl
                                                    border border-violet-500/10
                                                    bg-violet-500/[0.04]
                                                    p-4
                                                ">
                                                    <p className="
                                                        mb-2
                                                        text-[11px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-wider
                                                        text-violet-400
                                                    ">
                                                        AI Feedback
                                                    </p>

                                                    <p className="
                                                        text-sm
                                                        leading-6
                                                        text-zinc-300
                                                    ">
                                                        {item.feedback}
                                                    </p>
                                                </div>
                                            )}

                                            </div>

                                        </div>
                                    );
                                })

                            )}

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* RIGHT SIDEBAR */}
                    {/* ================================= */}

                    <div className="space-y-6">


                        {/* Strengths */}
                        <div className="
                            rounded-3xl
                            border border-white/10
                            bg-white/[0.025]
                            p-6
                        ">

                            <div className="
                                mb-5
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-emerald-500/10
                                    text-emerald-400
                                ">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Strengths
                                    </h3>

                                    <p className="
                                        mt-0.5
                                        text-xs
                                        text-zinc-600
                                    ">
                                        What you did well
                                    </p>
                                </div>

                            </div>

                            <ul className="space-y-3">

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-emerald-400">
                                        •
                                    </span>
                                    Clear communication
                                </li>

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-emerald-400">
                                        •
                                    </span>
                                    Good understanding of concepts
                                </li>

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-emerald-400">
                                        •
                                    </span>
                                    Structured responses
                                </li>

                            </ul>

                        </div>


                        {/* Improvement */}
                        <div className="
                            rounded-3xl
                            border border-white/10
                            bg-white/[0.025]
                            p-6
                        ">

                            <div className="
                                mb-5
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-orange-500/10
                                    text-orange-400
                                ">
                                    ↑
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        Focus Areas
                                    </h3>

                                    <p className="
                                        mt-0.5
                                        text-xs
                                        text-zinc-600
                                    ">
                                        Where you can improve
                                    </p>
                                </div>

                            </div>

                            <ul className="space-y-3">

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-orange-400">
                                        •
                                    </span>
                                    Add more real-world examples
                                </li>

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-orange-400">
                                        •
                                    </span>
                                    Explain technical decisions in more depth
                                </li>

                                <li className="
                                    flex
                                    gap-2
                                    text-sm
                                    leading-relaxed
                                    text-zinc-400
                                ">
                                    <span className="text-orange-400">
                                        •
                                    </span>
                                    Keep answers concise and structured
                                </li>

                            </ul>

                        </div>


                        {/* Practice Again */}
                        <div className="
                            overflow-hidden
                            rounded-3xl
                            border border-violet-500/20
                            bg-gradient-to-br
                            from-violet-500/10
                            to-indigo-500/5
                            p-6
                        ">

                            <p className="
                                text-sm
                                font-semibold
                                text-white
                            ">
                                Want to improve your score?
                            </p>

                            <p className="
                                mt-2
                                text-xs
                                leading-relaxed
                                text-zinc-500
                            ">
                                Practice another mock interview and
                                strengthen your weak areas.
                            </p>

                            <button
                                onClick={() => {
                                    if (mockInterviewId) {
                                        navigate(
                                            `/mock-interview/${mockInterviewId}`
                                        );
                                    }
                                }}
                                className="
                                    group
                                    mt-5
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-indigo-600
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                "
                            >
                                Practice Again

                                <span className="
                                    transition-transform
                                    group-hover:translate-x-1
                                ">
                                    →
                                </span>
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default InterviewResults;