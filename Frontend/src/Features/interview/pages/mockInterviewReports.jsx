import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    ClipboardCheck,
    Clock3,
    MessageSquare,
    Sparkles,
    Trophy,
} from "lucide-react";

import { getMyMockInterviews } from "../services/interview.api.js";
import PageShell from "../../layout/PageShell.jsx";

const MockInterviewReports = () => {
    const navigate = useNavigate();

    const [mockInterviews, setMockInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMockInterviews();
    }, []);

    const fetchMockInterviews = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMyMockInterviews();

            setMockInterviews(response.data || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load mock interview reports"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleViewResult = (mockInterviewId) => {
        navigate(`/interview-results/${mockInterviewId}`);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
        if (score >= 60) return "text-violet-600 dark:text-violet-400";
        if (score >= 40) return "text-amber-600 dark:text-amber-400";

        return "text-red-600 dark:text-red-400";
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Needs Improvement";

        return "Keep Practicing";
    };

    if (loading) {
        return (
            <PageShell>
                <div className="mx-auto max-w-7xl px-5 py-10 md:px-6">
                    <div className="mb-8 animate-pulse">
                        <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="mt-4 h-9 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="mt-3 h-4 w-96 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-40 animate-pulse rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                            />
                        ))}
                    </div>
                </div>
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <div className="mx-auto max-w-7xl px-5 py-10 md:px-6">
                    <button
                        onClick={() => navigate("/reports")}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                    >
                        <ArrowLeft size={16} />
                        Back to Reports
                    </button>

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
                        <p className="font-medium text-red-600 dark:text-red-400">
                            {error}
                        </p>

                        <button
                            onClick={fetchMockInterviews}
                            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
                {/* Back */}
                <button
                    onClick={() => navigate("/reports")}
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                >
                    <ArrowLeft size={16} />
                    Back to Interview Reports
                </button>

                {/* Header */}
                <div className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
                            <MessageSquare size={13} />
                            MOCK INTERVIEWS
                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                            Mock Interview Reports
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 md:text-base dark:text-zinc-400">
                            Review your previous mock interviews, track your
                            performance, and identify areas to improve.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
                    >
                        <Sparkles size={16} />
                        New Interview
                    </button>
                </div>

                {/* Summary */}
                {mockInterviews.length > 0 && (
                    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Total Attempts
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                                        {mockInterviews.length}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                    <ClipboardCheck size={19} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Completed
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                                        {
                                            mockInterviews.filter(
                                                (item) =>
                                                    item.status === "completed"
                                            ).length
                                        }
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <Trophy size={19} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Average Score
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                                        {Math.round(
                                            mockInterviews.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    (item.overallScore || 0),
                                                0
                                            ) / mockInterviews.length
                                        )}
                                        <span className="ml-1 text-sm font-medium text-zinc-400">
                                            /100
                                        </span>
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                    <Trophy size={19} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {mockInterviews.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                            <MessageSquare size={25} />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white">
                            No Mock Interviews Yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                            Complete your first mock interview to start
                            tracking your performance and interview progress.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                        >
                            <Sparkles size={16} />
                            Start Mock Interview
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {mockInterviews.map((mockInterview) => {
                            const report = mockInterview.interviewReport;
                            const score = mockInterview.overallScore ?? 0;

                            return (
                                <div
                                    key={mockInterview._id}
                                    className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md md:p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-500/30"
                                >
                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Left */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start gap-4">
                                                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:flex dark:bg-violet-500/10 dark:text-violet-400">
                                                    <MessageSquare size={19} />
                                                </div>

                                                <div className="min-w-0">
                                                    <h2 className="truncate text-lg font-semibold text-zinc-900 dark:text-white">
                                                        {report?.jobTitle ||
                                                            report?.role ||
                                                            "Mock Interview"}
                                                    </h2>

                                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                                        {report?.interviewType && (
                                                            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                                                {
                                                                    report.interviewType
                                                                }
                                                            </span>
                                                        )}

                                                        {report?.experienceLevel && (
                                                            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                                                {
                                                                    report.experienceLevel
                                                                }
                                                            </span>
                                                        )}

                                                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                                                            <CalendarDays
                                                                size={13}
                                                            />
                                                            {new Date(
                                                                mockInterview.createdAt
                                                            ).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            {/* Score */}
                                            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/70">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-violet-100 dark:border-violet-500/20">
                                                    <span
                                                        className={`text-sm font-bold ${getScoreColor(
                                                            score
                                                        )}`}
                                                    >
                                                        {score}
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-zinc-400">
                                                        Score
                                                    </p>

                                                    <p
                                                        className={`text-sm font-semibold ${getScoreColor(
                                                            score
                                                        )}`}
                                                    >
                                                        {getScoreLabel(score)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                {mockInterview.status ===
                                                "completed" ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                                        <Clock3 size={13} />
                                                        In Progress
                                                    </span>
                                                )}
                                            </div>

                                            {/* Button */}
                                            <button
                                                onClick={() =>
                                                    handleViewResult(
                                                        mockInterview._id
                                                    )
                                                }
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                                            >
                                                View Result
                                                <ArrowRight
                                                    size={15}
                                                    className="transition-transform group-hover:translate-x-0.5"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </PageShell>
                
    );
};

export default MockInterviewReports;