import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { getMockInterviewById } from "../services/interview.api.js";
import PageShell from "../../layout/PageShell.jsx";

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

                setMockInterview(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load interview result"
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
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                            Loading interview result...
                        </p>
                    </div>
                </div>
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center px-5">
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </p>
                </div>
            </PageShell>
        );
    }

    if (!mockInterview) {
        return (
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Interview result not found.
                    </p>
                </div>
            </PageShell>
        );
    }

    const answers = mockInterview.answers || [];

    const scores = answers
        .map((item) => item.score)
        .filter((score) => typeof score === "number");

    const overallScore =
        mockInterview.overallScore ??
        (scores.length > 0
            ? Math.round(
                  scores.reduce((sum, score) => sum + score, 0) / scores.length
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
        if (score >= 70) return "text-emerald-600 dark:text-emerald-400";
        if (score >= 50) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    return (
        <PageShell>
            <div className="relative mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Interview
                    </button>

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-400">
                                <Sparkles size={13} />
                                AI Interview Results
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                                Your Interview Performance
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                                Review your answers, understand your strengths, and identify
                                where you can improve.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Interview Completed
                        </div>
                    </div>
                </div>

                <div className="mb-6 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:border-white/10 dark:from-violet-500/[0.09] dark:via-white/[0.03] dark:to-indigo-500/[0.06]">
                    <div className="grid md:grid-cols-[280px_1fr]">
                        <div className="flex flex-col items-center justify-center border-b border-zinc-200 p-8 md:border-b-0 md:border-r dark:border-white/10">
                            <div className="relative flex h-40 w-40 items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/5" />
                                <div className="absolute inset-3 rounded-full border border-zinc-200 dark:border-white/5" />
                                <div className="relative text-center">
                                    <p className="text-4xl font-bold text-zinc-950 dark:text-white">
                                        {overallScore}
                                    </p>
                                    <p className="mt-1 text-xs text-zinc-500">/ 100</p>
                                </div>
                            </div>
                            <p className={`mt-4 text-sm font-semibold ${getScoreColor(overallScore)}`}>
                                {getScoreLabel(overallScore)}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">Overall Interview Score</p>
                        </div>

                        <div className="p-7 md:p-9">
                            <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                                Performance Overview
                            </p>
                            <p className="mt-1 text-sm text-zinc-500">
                                Here&apos;s how you performed across the interview.
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                                <MiniStat label="Questions Answered" value={answers.length} />
                                <MiniStat
                                    label="Strong Answers"
                                    value={scores.filter((score) => score >= 70).length}
                                    accent
                                />
                                <MiniStat
                                    label="Powered Evaluation"
                                    value="AI"
                                    className="col-span-2 md:col-span-1"
                                    violet
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="hr-card p-6 md:p-7">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                                    Answer Review
                                </h2>
                                <p className="mt-1 text-xs text-zinc-500">
                                    Detailed feedback from the AI interviewer
                                </p>
                            </div>
                            <span className="rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-400">
                                {answers.length} answers
                            </span>
                        </div>

                        <div className="space-y-4">
                            {answers.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-white/10">
                                    <p className="text-sm text-zinc-500">
                                        No interview answers found.
                                    </p>
                                </div>
                            ) : (
                                answers.map((item, index) => {
                                    const score = item.score ?? 0;

                                    return (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-black/20"
                                        >
                                            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5 dark:border-white/10">
                                                <div className="flex gap-3">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    <p className="text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                                                        {item.question}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                                                        score >= 70
                                                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                            : score >= 50
                                                              ? "bg-amber-50 text-amber-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                    }`}
                                                >
                                                    {score}/100
                                                </span>
                                            </div>

                                            <div className="p-5">
                                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                                                    Your Answer
                                                </p>
                                                <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                                                    {item.answer}
                                                </p>

                                                {item.feedback && (
                                                    <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/10 dark:bg-violet-500/[0.04]">
                                                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                                                            AI Feedback
                                                        </p>
                                                        <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
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

                    <div className="space-y-6">
                        <SidebarCard
                            title="Strengths"
                            subtitle="What you did well"
                            tone="emerald"
                            items={[
                                "Clear communication",
                                "Good understanding of concepts",
                                "Structured responses",
                            ]}
                        />
                        <SidebarCard
                            title="Focus Areas"
                            subtitle="Where you can improve"
                            tone="orange"
                            items={[
                                "Add more real-world examples",
                                "Explain technical decisions in more depth",
                                "Keep answers concise and structured",
                            ]}
                        />

                        <div className="overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 dark:border-violet-500/20 dark:from-violet-500/10 dark:to-indigo-500/5">
                            <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                                Want to improve your score?
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                                Practice another mock interview and strengthen your weak areas.
                            </p>
                            <button
                                onClick={() => {
                                    if (mockInterviewId) {
                                        navigate(`/mock-interview/${mockInterviewId}`);
                                    }
                                }}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
                            >
                                Practice Again
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

const MiniStat = ({ label, value, accent, violet, className = "" }) => (
    <div
        className={`rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-black/20 ${className}`}
    >
        <p
            className={`text-2xl font-bold ${
                accent
                    ? "text-emerald-600 dark:text-emerald-400"
                    : violet
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-zinc-950 dark:text-white"
            }`}
        >
            {value}
        </p>
        <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
);

const SidebarCard = ({ title, subtitle, tone, items }) => {
    const color =
        tone === "emerald"
            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
            : "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10";

    return (
        <div className="hr-card p-6">
            <div className="mb-5 flex items-center gap-3">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${color}`}
                >
                    {tone === "emerald" ? "✓" : "↑"}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
                </div>
            </div>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                    >
                        <span className={tone === "emerald" ? "text-emerald-500" : "text-orange-500"}>
                            •
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterviewResults;
