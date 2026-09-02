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
                if (isActive) setReport(response.data.interviewReport);
            })
            .catch(() => {
                if (isActive) setError("Unable to load interview report");
            })
            .finally(() => {
                if (isActive) setLoading(false);
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
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-5 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-12 w-96 max-w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-5 w-[32rem] max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                            <div className="h-[34rem] rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-[34rem] rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </div>
                </main>
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <main className="flex min-h-[70vh] items-center justify-center px-5 py-12">
                    <div className="w-full max-w-md rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-xl shadow-red-500/5 dark:border-red-500/20 dark:bg-[#121218]">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                            <AlertTriangle size={25} className="text-red-500" />
                        </div>
                        <h2 className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
                            {error}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                            We couldn&apos;t load this interview session. Please try
                            again.
                        </p>
                        <div className="mt-7 flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="hr-btn-secondary flex-1"
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={loadInterview}
                                className="hr-btn-primary flex-1"
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
            <main className="mx-auto max-w-6xl px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
                {/* Top bar */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white transition group-hover:border-zinc-300 group-hover:-translate-x-0.5 dark:border-white/10 dark:bg-white/[0.03]">
                            <ArrowLeft size={15} />
                        </span>
                        Exit interview
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                                Session progress
                            </p>
                            <p className="mt-0.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                {answeredCount} of {questions.length} answered
                            </p>
                        </div>
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                                style={{
                                    width: `${isFinished ? 100 : progress}%`,
                                }}
                            />
                        </div>
                        <span className="min-w-11 text-right text-sm font-bold text-violet-600 dark:text-violet-400">
                            {isFinished ? 100 : progress}%
                        </span>
                    </div>
                </div>

                {/* Hero */}
                <section className="relative mb-4 overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#121218] sm:p-3.5">
                    <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                                <Sparkles size={13} />
                                HIREREADY AI · MOCK INTERVIEW
                            </div>
                            <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                                {report.title || "AI Mock Interview"}
                            </h1>
                            <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                Practice under realistic interview conditions and
                                receive AI-powered feedback on every answer.
                            </p>
                        </div>

                        <div
                            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold ${
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

                {/* Session overview */}
                <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
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

                {!isFinished ? (
                    <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
                        {/* Question navigator */}
                        <aside className="h-fit rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#121218] lg:sticky lg:top-6">
                            <div className="flex items-center justify-between px-2 pb-3">
                                <div>
                                    <p className="text-sm font-bold text-zinc-950 dark:text-white">
                                        Interview flow
                                    </p>
                                    <p className="mt-0.5 text-xs text-zinc-400">
                                        {questions.length} questions
                                    </p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                    <Clock3 size={15} />
                                </div>
                            </div>

                            <div className="mb-3 h-px bg-zinc-100 dark:bg-white/10" />

                            <div className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[22rem] lg:flex-col lg:overflow-y-auto">
                                {questions.map((question, index) => {
                                    const isActive = index === currentQuestion;
                                    const isDone = index < answeredCount;
                                    const isBehavioral = !!question.intention;

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
                                            className={`group flex min-w-[125px] items-center gap-3 rounded-xl p-2.5 text-left transition lg:min-w-0 ${
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
                                                    <Check size={14} strokeWidth={3} />
                                                ) : (
                                                    index + 1
                                                )}
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span
                                                    className={`block text-xs font-semibold ${
                                                        isActive
                                                            ? "text-violet-700 dark:text-violet-300"
                                                            : "text-zinc-600 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    Question {index + 1}
                                                </span>
                                                <span className="mt-0.5 block text-[10px] text-zinc-400">
                                                    {isBehavioral ? "Behavioral" : "Technical"}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </aside>

                        {/* Interview workspace */}
                        <section className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#121218]">
                            <div className="border-b border-zinc-100 px-4 py-3 dark:border-white/10 sm:px-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20">
                                            <BrainCircuit size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-950 dark:text-white">
                                                AI Interviewer
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                Take your time · Think before you answer
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300">
                                        {currentQuestion + 1} / {questions.length}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 sm:p-5 lg:p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <CategoryBadge isBehavioral={!!current?.intention} />
                                    <span className="text-xs text-zinc-400">
                                        Question {currentQuestion + 1}
                                    </span>
                                </div>

                                <h2 className="mt-3 max-w-4xl text-xl font-bold leading-[1.45] tracking-tight text-zinc-950 dark:text-white sm:text-[1.35rem]">
                                    {current?.question}
                                </h2>

                                {current?.intention && (
                                    <div className="mt-4 flex gap-2.5 rounded-xl border border-amber-200/70 bg-amber-50/60 p-3 dark:border-amber-400/15 dark:bg-amber-500/[0.06]">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                            <Lightbulb size={15} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
                                                What the interviewer is assessing
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-amber-900/75 dark:text-amber-100/70">
                                                {current.intention}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-5">
                                    <div className="mb-2.5 flex items-center justify-between">
                                        <label
                                            htmlFor="mock-answer"
                                            className="text-sm font-bold text-zinc-800 dark:text-zinc-200"
                                        >
                                            Your answer
                                        </label>
                                        <span className="text-xs text-zinc-400">
                                            {answer.trim()
                                                ? answer.trim().split(/\s+/).length
                                                : 0}{" "}
                                            words
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            id="mock-answer"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Write your answer as if you were speaking to the interviewer..."
                                            className="min-h-[150px] w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3.5 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-400/60 dark:focus:bg-black/30"
                                        />
                                        <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-lg border border-zinc-200 bg-white/90 px-2 py-1 text-[10px] text-zinc-400 backdrop-blur sm:block dark:border-white/10 dark:bg-zinc-900/90">
                                            Ctrl + Enter
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-zinc-400">
                                        Tip: Give a structured answer and include a concrete
                                        example whenever possible.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleSubmitAnswer}
                                        disabled={!answer.trim() || isEvaluating}
                                        className="hr-btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
                                    >
                                        {isEvaluating ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                AI is evaluating...
                                            </>
                                        ) : (
                                            <>
                                                {currentQuestion === questions.length - 1
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
                            navigate(`/interview-results/${mockInterviewId}`, {
                                state: {
                                    answers,
                                    mockInterviewId,
                                },
                            })
                        }
                    />
                )}
            </main>
        </PageShell>
    );
};

const StatCard = ({ icon: Icon, label, value, tone = "violet" }) => {
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
        <div className="rounded-xl border border-zinc-200/80 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#121218] sm:p-3.5">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                        tones[tone] || tones.violet
                    }`}
                >
                    <Icon size={17} />
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-400 dark:text-zinc-500">
                        {label}
                    </p>
                    <p className="mt-1 truncate text-sm font-bold text-zinc-900 dark:text-white sm:text-base">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CategoryBadge = ({ isBehavioral }) =>
    isBehavioral ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-400">
            <MessageSquareText size={12} />
            Behavioral
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
            <Code2 size={12} />
            Technical
        </span>
    );

const CompletionCard = ({ questionCount, onBack, onResults }) => (
    <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white px-5 py-14 text-center shadow-sm dark:border-white/10 dark:bg-[#121218] sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[34rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-emerald-500/20">
                <Check size={34} strokeWidth={3} />
            </div>

            <div className="mx-auto mt-7 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    Session complete
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                    Great work. Your interview is complete.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">
                    You answered all {questionCount} questions. Your AI evaluation
                    is ready with actionable feedback to help you improve.
                </p>
            </div>

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03]">
                <CompletionStat value={questionCount} label="Answered" />
                <CompletionStat value="AI" label="Evaluated" />
                <CompletionStat value="100%" label="Complete" />
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

const CompletionStat = ({ value, label }) => (
    <div className="px-3 py-4 sm:px-5">
        <p className="text-xl font-bold text-zinc-950 dark:text-white sm:text-2xl">
            {value}
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {label}
        </p>
    </div>
);

export default MockInterview;
