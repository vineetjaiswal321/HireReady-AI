import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    BrainCircuit,
    BriefcaseBusiness,
    Check,
    CheckCircle2,
    Clock3,
    Code2,
    Lightbulb,
    Loader2,
    MessageSquareText,
    RefreshCw,
    Sparkles,
    Target,
} from "lucide-react";

import { getMockInterviewById } from "../services/interview.api.js";
import { useInterview } from "../../hooks/useInterview.hooks.js";
import PageShell from "../../layout/PageShell.jsx";

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
    const { evaluateAnswer } = useInterview();

    const loadInterview = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getMockInterviewById(mockInterviewId);
            setReport(response.data.interviewReport);
        } catch {
            setError("Unable to load interview report");
        } finally {
            setLoading(false);
        }
    }, [mockInterviewId]);

    useEffect(() => {
        let isActive = true;

        setLoading(true);
        setError(null);

        getMockInterviewById(mockInterviewId)
            .then((response) => {
                if (isActive) {
                    setReport(response.data.interviewReport);
                }
            })
            .catch(() => {
                if (isActive) {
                    setError("Unable to load interview report");
                }
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [mockInterviewId]);

    const questions = useMemo(
        () => [
            ...(report?.technicalQuestions || []),
            ...(report?.behavioralQuestions || []),
        ],
        [report]
    );

    const current = questions[currentQuestion];

    const progress =
        questions.length > 0
            ? Math.round(((currentQuestion + 1) / questions.length) * 100)
            : 0;

    const answeredCount = answers.length;

    const handleSubmitAnswer = async () => {
        if (!answer.trim() || isEvaluating || !current) return;

        try {
            setIsEvaluating(true);

            const evaluation = await evaluateAnswer({
                mockInterviewId,
                question: current.question,
                answer,
            });

            setAnswers((prev) => [
                ...prev,
                {
                    question: current.question,
                    answer,
                    evaluation,
                },
            ]);

            setAnswer("");

            if (currentQuestion === questions.length - 1) {
                setIsFinished(true);
                return;
            }

            setCurrentQuestion((prev) => prev + 1);
        } catch {
            // Keep the current answer available so the user can retry.
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmitAnswer();
        }
    };

    if (loading) {
        return (
            <PageShell>
                <main className="mx-auto w-full max-w-7xl overflow-x-hidden px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="animate-pulse space-y-5 sm:space-y-6">
                        <div className="h-5 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />

                        <div className="h-10 w-96 max-w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 sm:h-12" />

                        <div className="h-5 w-full max-w-[32rem] rounded bg-zinc-200 dark:bg-zinc-800" />

                        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                            <div className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800 lg:h-[34rem]" />
                            <div className="h-[30rem] rounded-2xl bg-zinc-200 dark:bg-zinc-800 sm:h-[34rem]" />
                        </div>
                    </div>
                </main>
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <main className="flex min-h-[70vh] items-center justify-center overflow-x-hidden px-4 py-10 sm:px-5 sm:py-12">
                    <div className="w-full max-w-md rounded-[1.5rem] border border-red-200 bg-white p-5 text-center shadow-xl shadow-red-500/5 dark:border-red-500/20 dark:bg-[#121218] sm:rounded-[2rem] sm:p-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10 sm:h-16 sm:w-16">
                            <AlertTriangle
                                size={23}
                                className="text-red-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-zinc-950 dark:text-white sm:mt-5 sm:text-xl">
                            {error}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                            We couldn&apos;t load this interview session. Please
                            try again.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="hr-btn-secondary w-full justify-center"
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={loadInterview}
                                className="hr-btn-primary w-full justify-center"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    </div>
                </main>
            </PageShell>
        );
    }

    if (!report) return null;

    return (
        <PageShell>
            <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-2.5 py-2.5 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
                {/* ================= TOP BAR ================= */}
                <div className="mb-3 flex flex-col gap-2.5 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white transition group-hover:-translate-x-0.5 group-hover:border-zinc-300 dark:border-white/10 dark:bg-white/[0.03]">
                            <ArrowLeft size={15} />
                        </span>

                        Exit interview
                    </button>

                    <div className="flex items-center justify-between gap-2.5 sm:justify-end sm:gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                                Session progress
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                {answeredCount} of {questions.length} answered
                            </p>
                        </div>

                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 sm:h-2 sm:w-28">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                                style={{
                                    width: `${isFinished ? 100 : progress}%`,
                                }}
                            />
                        </div>

                        <span className="min-w-9 text-right text-xs font-bold text-violet-600 dark:text-violet-400 sm:min-w-11 sm:text-sm">
                            {isFinished ? 100 : progress}%
                        </span>
                    </div>
                </div>

                {/* ================= HERO ================= */}
                <section className="relative mb-3 overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#121218] sm:mb-4 sm:p-3.5">
                    <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-2.5 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.1em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 sm:mb-3 sm:px-3 sm:text-[11px] sm:tracking-[0.12em]">
                                <Sparkles size={13} />
                                <span className="truncate">
                                    HIREREADY AI · MOCK INTERVIEW
                                </span>
                            </div>

                            <h1 className="max-w-full break-words text-xl font-bold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                                {report.title || "AI Mock Interview"}
                            </h1>

                            <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                Practice under realistic interview conditions
                                and receive AI-powered feedback on every
                                answer.
                            </p>
                        </div>

                        <div
                            className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                                isFinished
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                                    : "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300"
                            }`}
                        >
                            {isFinished ? (
                                <CheckCircle2 size={14} />
                            ) : (
                                <>
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-70" />
                                        <span className="relative h-2 w-2 rounded-full bg-violet-500" />
                                    </span>

                                    Live session
                                </>
                            )}

                            {isFinished ? "Completed" : "In progress"}
                        </div>
                    </div>
                </section>

                {/* ================= SESSION OVERVIEW ================= */}
                <div className="mb-3 grid grid-cols-2 gap-1.5 sm:mb-4 sm:gap-2 lg:grid-cols-4">
                    <StatCard
                        icon={BriefcaseBusiness}
                        label="Experience"
                        value={report.experienceLevel || "Not specified"}
                        tone="violet"
                    />

                    <StatCard
                        icon={Target}
                        label="Interview type"
                        value={report.interviewType || "Not specified"}
                        tone="indigo"
                    />

                    <StatCard
                        icon={Code2}
                        label="Technical"
                        value={`${report.technicalQuestions?.length || 0} questions`}
                        tone="emerald"
                    />

                    <StatCard
                        icon={MessageSquareText}
                        label="Behavioral"
                        value={`${report.behavioralQuestions?.length || 0} questions`}
                        tone="amber"
                    />
                </div>

                {/* ================= INTERVIEW ================= */}
                {!isFinished ? (
                    <div className="grid min-w-0 gap-3 sm:gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
                        {/* ================= QUESTION NAVIGATOR ================= */}
                        <aside className="min-w-0 rounded-xl border border-zinc-200/80 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-[#121218] sm:p-3 lg:sticky lg:top-6 lg:h-fit">
                            <div className="flex items-center justify-between px-1.5 pb-2.5 sm:px-2 sm:pb-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-zinc-950 dark:text-white">
                                        Interview flow
                                    </p>

                                    <p className="mt-0.5 text-xs text-zinc-400">
                                        {questions.length} questions
                                    </p>
                                </div>

                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                    <Clock3 size={15} />
                                </div>
                            </div>

                            <div className="mb-2 h-px bg-zinc-100 dark:bg-white/10 sm:mb-3" />

                            {/* Mobile = horizontal / Desktop = vertical */}
                            <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin] lg:max-h-[22rem] lg:flex-col lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden">
                                {questions.map((question, index) => {
                                    const isActive =
                                        index === currentQuestion;

                                    const isDone =
                                        index < answeredCount;

                                    const isBehavioral =
                                        !!question.intention;

                                    return (
                                        <button
                                            key={`${question.question}-${index}`}
                                            type="button"
                                            onClick={() => {
                                                if (index <= answeredCount) {
                                                    setCurrentQuestion(index);
                                                }
                                            }}
                                            disabled={index > answeredCount}
                                            className={`group flex min-w-[76px] shrink-0 flex-col items-center gap-1.5 rounded-xl p-2 text-center transition sm:min-w-[100px] sm:flex-row sm:gap-3 sm:text-left lg:min-w-0 ${
                                                isActive
                                                    ? "bg-violet-50 dark:bg-violet-500/10"
                                                    : index <= answeredCount
                                                      ? "hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
                                                      : "cursor-not-allowed opacity-45"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                                    isDone
                                                        ? "bg-emerald-500 text-white"
                                                        : isActive
                                                          ? "bg-violet-600 text-white shadow-sm shadow-violet-600/25"
                                                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                                                }`}
                                            >
                                                {isDone ? (
                                                    <Check
                                                        size={14}
                                                        strokeWidth={3}
                                                    />
                                                ) : (
                                                    index + 1
                                                )}
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={`block text-[11px] font-semibold sm:text-xs ${
                                                        isActive
                                                            ? "text-violet-700 dark:text-violet-300"
                                                            : "text-zinc-600 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    Question {index + 1}
                                                </span>

                                                <span className="mt-0.5 block text-[9px] text-zinc-400 sm:text-[10px]">
                                                    {isBehavioral
                                                        ? "Behavioral"
                                                        : "Technical"}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </aside>

                        {/* ================= INTERVIEW WORKSPACE ================= */}
                        <section className="min-w-0 overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#121218]">
                            {/* Workspace Header */}
                            <div className="border-b border-zinc-100 px-3 py-2.5 dark:border-white/10 sm:px-5 sm:py-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20">
                                            <BrainCircuit size={15} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                                                AI Interviewer
                                            </p>

                                            <p className="hidden truncate text-xs text-zinc-400 sm:block">
                                                Take your time · Think before
                                                you answer
                                            </p>

                                            <p className="text-[10px] text-zinc-400 sm:hidden">
                                                Think before you answer
                                            </p>
                                        </div>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300 sm:px-3 sm:text-xs">
                                        {currentQuestion + 1} /{" "}
                                        {questions.length}
                                    </span>
                                </div>
                            </div>

                            {/* Workspace Content */}
                            <div className="min-w-0 p-3.5 sm:p-5 lg:p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <CategoryBadge
                                        isBehavioral={!!current?.intention}
                                    />

                                    <span className="text-xs text-zinc-400">
                                        Question {currentQuestion + 1}
                                    </span>
                                </div>

                                <h2 className="mt-3 max-w-4xl break-words text-lg font-bold leading-[1.45] tracking-tight text-zinc-950 dark:text-white sm:text-[1.35rem]">
                                    {current?.question}
                                </h2>

                                {/* Assessment */}
                                {current?.intention && (
                                    <div className="mt-4 flex gap-2.5 rounded-xl border border-amber-200/70 bg-amber-50/60 p-3 dark:border-amber-400/15 dark:bg-amber-500/[0.06]">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                            <Lightbulb size={15} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                                                What the interviewer is
                                                assessing
                                            </p>

                                            <p className="mt-1 break-words text-sm leading-6 text-amber-900/75 dark:text-amber-100/70">
                                                {current.intention}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Answer */}
                                <div className="mt-5">
                                    <div className="mb-2.5 flex items-center justify-between gap-2">
                                        <label
                                            htmlFor="mock-answer"
                                            className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                                        >
                                            Your answer
                                        </label>

                                        <span className="shrink-0 text-[11px] text-zinc-400 sm:text-xs">
                                            {answer.trim()
                                                ? answer
                                                      .trim()
                                                      .split(/\s+/).length
                                                : 0}{" "}
                                            words
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            id="mock-answer"
                                            value={answer}
                                            onChange={(e) =>
                                                setAnswer(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            placeholder="Write your answer as if you were speaking to the interviewer..."
                                            className="min-h-[170px] w-full max-w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3.5 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-400/60 dark:focus:bg-black/30 sm:min-h-[150px]"
                                        />

                                        <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-lg border border-zinc-200 bg-white/90 px-2 py-1 text-[10px] text-zinc-400 backdrop-blur sm:block dark:border-white/10 dark:bg-zinc-900/90">
                                            Ctrl + Enter
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom actions */}
                                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-zinc-400">
                                        Tip: Give a structured answer and
                                        include a concrete example whenever
                                        possible.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleSubmitAnswer}
                                        disabled={
                                            !answer.trim() || isEvaluating
                                        }
                                        className="hr-btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
                                    >
                                        {isEvaluating ? (
                                            <>
                                                <Loader2
                                                    size={16}
                                                    className="animate-spin"
                                                />
                                                AI is evaluating...
                                            </>
                                        ) : (
                                            <>
                                                {currentQuestion ===
                                                questions.length - 1
                                                    ? "Complete interview"
                                                    : "Submit answer"}

                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <CompletionCard
                        questionCount={questions.length}
                        onBack={() => navigate("/mock-interview-reports")}
                        onResults={() =>
                            navigate(
                                `/interview-results/${mockInterviewId}`,
                                {
                                    state: {
                                        answers,
                                        mockInterviewId,
                                    },
                                }
                            )
                        }
                    />
                )}
            </main>
        </PageShell>
    );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
    icon: Icon,
    label,
    value,
    tone = "violet",
}) => {
    const tones = {
        violet:
            "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        indigo:
            "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
        emerald:
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        amber:
            "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    };

    return (
        <div className="min-w-0 rounded-xl border border-zinc-200/80 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-[#121218] sm:p-3.5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                        tones[tone] || tones.violet
                    }`}
                >
                    <Icon size={17} />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500 sm:text-[10px] sm:tracking-[0.13em]">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-xs font-bold text-zinc-900 dark:text-white sm:text-base">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   CATEGORY BADGE
========================================================= */

const CategoryBadge = ({ isBehavioral }) =>
    isBehavioral ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400 sm:px-3 sm:text-[11px]">
            <MessageSquareText size={12} />
            Behavioral
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-[10px] font-bold text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-400 sm:px-3 sm:text-[11px]">
            <Code2 size={12} />
            Technical
        </span>
    );

/* =========================================================
   COMPLETION CARD
========================================================= */

const CompletionCard = ({
    questionCount,
    onBack,
    onResults,
}) => (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white px-4 py-10 text-center shadow-sm dark:border-white/10 dark:bg-[#121218] sm:rounded-[2rem] sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[34rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-emerald-500/20 sm:h-20 sm:w-20 sm:rounded-[1.75rem]">
                <Check
                    size={30}
                    strokeWidth={3}
                    className="sm:h-[34px] sm:w-[34px]"
                />
            </div>

            <div className="mx-auto mt-6 max-w-2xl sm:mt-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 sm:text-xs">
                    Session complete
                </p>

                <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                    Great work. Your interview is complete.
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-4 sm:text-base">
                    You answered all {questionCount} questions. Your AI
                    evaluation is ready with actionable feedback to help you
                    improve.
                </p>
            </div>

            <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03] sm:mt-9">
                <CompletionStat
                    value={questionCount}
                    label="Answered"
                />

                <CompletionStat
                    value="AI"
                    label="Evaluated"
                />

                <CompletionStat
                    value="100%"
                    label="Complete"
                />
            </div>

            <div className="mx-auto mt-5 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={onBack}
                    className="hr-btn-secondary w-full justify-center"
                >
                    <ArrowLeft size={16} />
                    Mock interviews
                </button>

                <button
                    type="button"
                    onClick={onResults}
                    className="hr-btn-primary w-full justify-center"
                >
                    View AI results
                    <ArrowRight size={16} />
                </button>
            </div>

            <p className="mt-4 text-xs text-zinc-400">
                Review your strengths, gaps, and suggested improvements.
            </p>
        </div>
    </section>
);

/* =========================================================
   COMPLETION STAT
========================================================= */

const CompletionStat = ({ value, label }) => (
    <div className="min-w-0 px-2.5 py-3.5 sm:px-5 sm:py-4">
        <p className="truncate text-lg font-bold text-zinc-950 dark:text-white sm:text-2xl">
            {value}
        </p>

        <p className="mt-1 truncate text-[9px] font-semibold uppercase tracking-wider text-zinc-400 sm:text-[10px]">
            {label}
        </p>
    </div>
);

export default MockInterview;