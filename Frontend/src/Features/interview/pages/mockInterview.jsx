import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMockInterviewById } from "../services/interview.api.js";

import { useInterview } from "../../hooks/useInterview.hooks.js"


const MockInterview = () => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const navigate = useNavigate();
    const { mockInterviewId } = useParams();

    const {
        evaluateAnswer
    } = useInterview();


    useEffect(() => {

    const fetchReport = async () => {

        try {

            setLoading(true);

            const response =
                await getMockInterviewById(mockInterviewId);

            setReport(response.data.interviewReport);

        } catch (error) {

            console.error(
                "Failed to load interview report:",
                error
            );

            setError(
                "Unable to load interview report"
            );

        } finally {

            setLoading(false);
        }
    };

    fetchReport();

}, [mockInterviewId]);


    if (loading) {
        return (
            <div className="min-h-screen bg-[#08080d] text-white flex items-center justify-center">

                <div className="text-center">

                    <div className="
                        w-10 h-10
                        border-4 border-violet-500/20
                        border-t-violet-500
                        rounded-full
                        animate-spin
                        mx-auto mb-4
                    " />

                    <h2 className="text-xl font-semibold">
                        Preparing Your Interview...
                    </h2>

                    <p className="text-zinc-400 mt-2">
                        Loading your interview questions
                    </p>

                </div>

            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-[#08080d] text-white flex items-center justify-center">

                <div className="text-center">

                    <h2 className="text-xl font-semibold text-red-400">
                        {error}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                        Please try again later.
                    </p>

                </div>

            </div>
        );
    }



    if (!report) {
        return null;
    }

    const questions = [
        ...(report?.technicalQuestions || []),
        ...(report?.behavioralQuestions || [])
    ];


    const handleSubmitAnswer = async () => {
    if (!answer.trim() || isEvaluating) return;

    try {
        setIsEvaluating(true);

        const current = questions[currentQuestion];

        const evaluation = await evaluateAnswer({
            mockInterviewId,
            question: current.question,
            answer
        });

        setAnswers(prev => [
            ...prev,
            {
                question: current.question,
                answer,
                evaluation
            }
        ]);

        setAnswer("");

        if (currentQuestion === questions.length - 1) {
            setIsFinished(true);
            return;
        }

        setCurrentQuestion(prev => prev + 1);

    } catch (error) {
        console.error("Failed to evaluate answer:", error);
    } finally {
        setIsEvaluating(false);
    }
};

    return (
        <div className="
            min-h-screen
            bg-[#08080d]
            text-white
            p-6
        ">

            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <p className="
                        text-sm
                        text-violet-400
                        font-medium
                        mb-2
                    ">
                        AI MOCK INTERVIEW
                    </p>

                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                    ">
                        {report.title || "Mock Interview"}
                    </h1>

                    <p className="
                        text-zinc-400
                        mt-2
                    ">
                        Test your knowledge and prepare for your interview.
                    </p>

                </div>


                {/* Report information */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                    mb-8
                ">

                    <div className="
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.03]
                        p-5
                    ">

                        <p className="text-zinc-400 text-sm">
                            Experience
                        </p>

                        <p className="text-lg font-semibold mt-1">
                            {report.experienceLevel || "Not specified"}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.03]
                        p-5
                    ">

                        <p className="text-zinc-400 text-sm">
                            Technical Questions
                        </p>

                        <p className="text-lg font-semibold mt-1">
                            {report.technicalQuestions?.length || 0}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.03]
                        p-5
                    ">

                        <p className="text-zinc-400 text-sm">
                            Behavioral Questions
                        </p>

                        <p className="text-lg font-semibold mt-1">
                            {report.behavioralQuestions?.length || 0}
                        </p>

                    </div>

                </div>


                {/* Questions Preview */}

                <div className="
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.03]
                    p-6
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-5
                    ">
                        Interview Questions
                    </h2>


                    {!isFinished ? (

                        <div className="
                            rounded-3xl
                            border border-white/10
                            bg-white/[0.03]
                            p-6 md:p-8
                        ">

                            {/* Progress */}

                            <div className="flex items-center justify-between mb-6">

                                <span className="
                                    text-sm
                                    text-zinc-400
                                ">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>

                                <span className="
                                    text-sm
                                    text-violet-400
                                    font-medium
                                ">
                                    {Math.round(
                                        ((currentQuestion + 1) / questions.length) * 100
                                    )}%
                                </span>

                            </div>


                            {/* Progress bar */}

                            <div className="
                                w-full
                                h-2
                                rounded-full
                                bg-white/5
                                mb-8
                            ">

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-gradient-to-r
                                        from-violet-500
                                        to-indigo-500
                                        transition-all
                                    "
                                    style={{
                                        width: `${
                                            ((currentQuestion + 1) / questions.length) * 100
                                        }%`
                                    }}
                                />

                            </div>


                            {/* Question */}

                            <div className="mb-8">

                                <span className="
                                    inline-flex
                                    px-3 py-1
                                    rounded-lg
                                    bg-violet-500/10
                                    text-violet-400
                                    text-xs
                                    font-medium
                                    mb-4
                                ">
                                    {questions[currentQuestion]?.intention
                                        ? "Behavioral"
                                        : "Technical"}
                                </span>


                                <h2 className="
                                    text-2xl
                                    md:text-3xl
                                    font-semibold
                                    leading-relaxed
                                ">
                                    {questions[currentQuestion]?.question}
                                </h2>

                            </div>


                            {/* Answer */}

                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="
                                    w-full
                                    min-h-[220px]
                                    resize-none
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    p-5
                                    text-white
                                    placeholder:text-zinc-600
                                    outline-none
                                    focus:border-violet-500/50
                                    transition
                                "
                            />


                            {/* Footer */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                mt-5
                            ">

                                <p className="text-sm text-zinc-500">
                                    Take your time and answer naturally.
                                </p>


                                <button
                                onClick={handleSubmitAnswer}
                                disabled={!answer.trim() || isEvaluating}
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-indigo-600
                                    px-6
                                    py-3
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                    hover:shadow-violet-500/30
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                    disabled:hover:translate-y-0
                                "
                            >
                                {isEvaluating ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Evaluating...
                                    </>
                                ) : (
                                    <>
                                        {currentQuestion === questions.length - 1
                                            ? "Finish Interview"
                                            : "Submit Answer"}

                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>

                            </div>

                        </div>

                    ) : (
                        <>
                        {/* Interview Completed */}

                        <div className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            border border-white/10
                            bg-gradient-to-br
                            from-violet-500/[0.08]
                            via-white/[0.03]
                            to-indigo-500/[0.06]
                            p-8 md:p-12
                            text-center
                        ">

                            {/* Decorative glow */}
                            <div className="
                                absolute
                                -top-24
                                left-1/2
                                h-48
                                w-48
                                -translate-x-1/2
                                rounded-full
                                bg-violet-500/10
                                blur-3xl
                            " />

                            {/* Success icon */}
                            <div className="
                                relative
                                mx-auto
                                mb-6
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-3xl
                                border border-emerald-400/20
                                bg-emerald-500/10
                            ">
                                <svg
                                    className="h-9 w-9 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            {/* Heading */}
                            <h2 className="
                                relative
                                text-2xl
                                md:text-3xl
                                font-bold
                                text-white
                            ">
                                Interview Completed
                            </h2>

                            <p className="
                                relative
                                mx-auto
                                mt-3
                                max-w-md
                                text-sm
                                md:text-base
                                leading-relaxed
                                text-zinc-400
                            ">
                                Great job! You've completed all{" "}
                                <span className="font-medium text-zinc-200">
                                    {questions.length}
                                </span>{" "}
                                questions. Your AI evaluation is ready.
                            </p>

                            {/* Stats */}
                            <div className="
                                relative
                                mx-auto
                                mt-8
                                grid
                                max-w-md
                                grid-cols-2
                                gap-3
                            ">

                                <div className="
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    px-4 py-4
                                ">
                                    <p className="text-xl font-bold text-white">
                                        {questions.length}
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        Questions Answered
                                    </p>
                                </div>

                                <div className="
                                    rounded-2xl
                                    border border-white/10
                                    bg-black/20
                                    px-4 py-4
                                ">
                                    <p className="text-xl font-bold text-emerald-400">
                                        Completed
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        AI Evaluation
                                    </p>
                                </div>

                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => {
                                    console.log("Interview Answers:", answers);

                                    navigate(`/interview-results/${mockInterviewId}`, {
                                    state: {
                                        answers,
                                        mockInterviewId
                                    }
                                });
                                }}
                                className="
                                    group
                                    relative
                                    mt-8
                                    inline-flex
                                    items-center
                                    gap-2.5
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-indigo-600
                                    px-7
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-xl
                                    hover:shadow-violet-500/30
                                "
                            >
                                <span>View Interview Results</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="
                                        h-4 w-4
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-1
                                    "
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 0 1 .75-.75h11.19l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1 0 1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <p className="relative mt-3 text-xs text-zinc-600">
                                Get detailed feedback on every answer
                            </p>

                        </div>
                    </>
                )}

                </div>

            </div>

        </div>
    );
};

export default MockInterview;