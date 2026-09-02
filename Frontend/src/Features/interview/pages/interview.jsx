import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    Loader2,
    Briefcase,
    AlertTriangle,
    CheckCircle2,
    ChevronDown,
    Circle,
    MessageSquare,
    Sparkles,
    Target,
    UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useInterview } from "../../hooks/useInterview.hooks.js";
import { startMockInterview } from "../services/interview.api.js";
import PageShell from "../../layout/PageShell.jsx";

const InterviewStrategy = () => {
  const navigate = useNavigate();

  const { interviewId }=useParams()

  const {
        report,
        loading,
        getReportById,
        generateResume,
        downloadResume
    } = useInterview();


  const [activeTab, setActiveTab] = useState("overview");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    
    useEffect(() => {

        if (!interviewId) return;

        getReportById(interviewId);

    }, [interviewId]);


  if (loading) {
    return (
        <PageShell>
            <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">

                <Loader2
                    size={40}
                    className="mx-auto mb-4 animate-spin text-violet-600 dark:text-violet-400"
                />

                <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                    Generating Your Resume PDF ......
                </h2>

                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Creating and securely saving your resume
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                    This may take a few seconds
                </p>

            </div>
            </div>
        </PageShell>
    );
}
  

  const toggleDay = (day) => {
    setCompletedDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  };

  if (!report) {
    return (
        <PageShell>
        <div className="flex min-h-[70vh] items-center justify-center">

            <div className="text-center">

                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                    No interview strategy found
                </h2>

                <p className="mb-6 mt-2 text-zinc-600 dark:text-zinc-400">
                    Generate an interview strategy first.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="rounded-xl bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-500"
                >
                    Create Strategy
                </button>

            </div>

        </div>
        </PageShell>
    );
  }

    const handleGeneratePDF = async () => {
        try {
            await generateResume(report._id);
        } catch (error) {
            // PDF generation failed - user can retry
        }
    };

    const handleDownloadPDF = async () => {
        try {
            await downloadResume(
                report._id,
                report.pdf.url
            );
        } catch (error) {
            // Download failed - user can retry
        }
    };
  return (
    <PageShell>

        {/* ================= MAIN ================= */}
        <main className="relative mx-auto max-w-7xl px-6 py-10">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

            {/* ================= HERO ================= */}
            <section className="mb-10">

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                    <div>

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                            <Sparkles size={14} />
                            AI Interview Strategy
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl dark:text-white">
                            Your Interview
                            <span className="text-violet-600 dark:text-violet-400">
                                {" "}Strategy
                            </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
                            A personalized preparation plan generated from
                            your resume, experience and target job.
                        </p>

                    </div>

                <div className="relative flex flex-col items-center">
                    {/* Match Score */}
                    <div className="relative">

                        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 dark:border-violet-500/20 dark:from-violet-500/20 dark:to-indigo-500/10">

                            <span className="text-4xl font-bold text-zinc-950 dark:text-white">
                                {report.matchScore ?? 0}%
                            </span>

                            <span className="text-sm text-zinc-400 mt-1">
                                Profile Match
                            </span>

                        </div>

                    
                    </div>

                    {/* Mock Interview CTA */}
                    <div className="mt-5 flex flex-col items-center">

                        <button
    onClick={async () => {

        try {

            const response =
                await startMockInterview(
                    interviewId
                );

            const mockInterviewId =
                response.data.mockInterviewId;

            navigate(
                `/mock-interview/${mockInterviewId}`
            );

        } catch (error) {
            // Mock interview failed to start - user can retry
        }
    }}
    className="
        group
        inline-flex
        items-center
        gap-2.5
        rounded-xl
        bg-gradient-to-r
        from-indigo-600
        to-violet-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-md
        shadow-indigo-500/20
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg
        hover:shadow-indigo-500/30
    "
>
    <span>Start Mock Interview</span>

    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:translate-x-1
        "
    >
        <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h11.19l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1 0 1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
        />
    </svg>
</button>

                        <span className="text-xs text-zinc-500 mt-2">
                            Practice with an AI-powered interview
                        </span>

                    </div>
                </div>
                    
                </div>

            {/* Pdf section ddownload */}
                {/* ================= PDF REPORT ================= */}
                <div className="mt-6">

                    {!report?.pdf?.url ? (

                        <button
                            onClick={handleGeneratePDF}
                            disabled={loading}
                            className="
                                flex items-center justify-center gap-2
                                px-5 py-3
                                rounded-xl
                                bg-violet-600
                                hover:bg-violet-500
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                text-white
                                font-medium
                                transition
                            "
                        >
                            {loading ? (
                                "Generating PDF..."
                            ) : (
                                "Generate Resume PDF"
                            )}
                        </button>

                    ) : (

                        <div className="flex items-center gap-3">

                            <button
                                onClick={() => setShowPdfPreview(true)}
                                className="
                                    px-5 py-3
                                    rounded-xl
                                    border border-zinc-200
                                    bg-white
                                    hover:bg-zinc-50
                                    text-zinc-900
                                    dark:border-white/10
                                    dark:bg-white/[0.05]
                                    dark:hover:bg-white/[0.1]
                                    dark:text-white
                                    transition
                                "
                            >
                                View PDF
                            </button>

                            <button
                                onClick={handleDownloadPDF}
                                className="
                                    px-5 py-3
                                    rounded-xl
                                    bg-violet-600
                                    hover:bg-violet-500
                                    text-white
                                    transition
                                "
                            >
                                Download PDF
                            </button>

                        </div>
                    )}

                </div>

            </section>


            {/* ================= OVERVIEW CARDS ================= */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

                {/* Experience */}
                <div className="hr-card p-5">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-blue-500/10">
                            <UserRound size={20} className="text-blue-400" />
                        </div>

                        <span className="text-zinc-400 text-sm">
                            Experience Level
                        </span>
                    </div>

                    <p className="text-lg font-semibold">
                        {report.experienceLevel || "Not specified"}
                    </p>

                </div>


                {/* Interview Type */}
                <div className="hr-card p-5">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10">
                            <MessageSquare size={20} className="text-emerald-400" />
                        </div>

                        <span className="text-zinc-400 text-sm">
                            Interview Type
                        </span>
                    </div>

                    <p className="text-lg font-semibold">
                        {report.interviewType || "Full Interview"}
                    </p>

                </div>


                {/* Job */}
                <div className="hr-card p-5">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-orange-500/10">
                            <Briefcase size={20} className="text-orange-400" />
                        </div>

                        <span className="text-zinc-400 text-sm">
                            Target Role
                        </span>
                    </div>

                    <p className="text-lg font-semibold">
                        {report.targetRole || "Not specified"}
                    </p>

                </div>

            </section>


            {/* ================= TABS ================= */}
            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-white/10">

                {[
                    ["overview", "Overview"],
                    ["technical", "Technical"],
                    ["behavioral", "Behavioral"],
                    ["skills", "Skill Gaps"],
                    ["plan", "Preparation Plan"],
                ].map(([id, label]) => (

                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                            activeTab === id
                                ? "border-violet-600 text-violet-700 dark:border-violet-400 dark:text-violet-400"
                                : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                        }`}
                    >
                        {label}
                    </button>

                ))}

            </div>


            {/* ================= OVERVIEW ================= */}
            {activeTab === "overview" && (

                <div className="space-y-8">

                    {/* Summary */}
                    <section className="hr-card p-6 md:p-8">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="p-3 rounded-xl bg-violet-500/10">
                                <Target
                                    size={22}
                                    className="text-violet-400"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Interview Overview
                                </h2>

                                <p className="text-sm text-zinc-500">
                                    Based on your submitted profile
                                </p>
                            </div>

                        </div>

                        <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                            Your profile has been analyzed against the
                            target job description. Review the technical
                            questions, behavioral questions, skill gaps
                            and preparation plan below.
                        </p>

                    </section>


                    {/* Skill Gaps Preview */}
                    <section>

                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-xl font-semibold">
                                Key Skill Gaps
                            </h2>

                            <button
                                onClick={() => setActiveTab("skills")}
                                className="text-sm text-violet-400 hover:text-violet-300"
                            >
                                View all
                            </button>

                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                            {report.skillGaps?.length > 0 ? (

                                report.skillGaps.map((gap, index) => (

                                    <div
                                        key={index}
                                        className="hr-card p-5"
                                    >

                                        <div className="flex items-start justify-between gap-3">

                                            <h3 className="font-medium">
                                                {gap.skill}
                                            </h3>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${
                                                    gap.severity === "high"
                                                        ? "bg-red-500/10 text-red-400"
                                                        : gap.severity === "medium"
                                                        ? "bg-yellow-500/10 text-yellow-400"
                                                        : "bg-green-500/10 text-green-400"
                                                }`}
                                            >
                                                {gap.severity}
                                            </span>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="col-span-full rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-center gap-3">

                                    <CheckCircle2
                                        className="text-emerald-400"
                                    />

                                    <p className="text-zinc-600 dark:text-zinc-300">
                                        No major skill gaps were identified.
                                    </p>

                                </div>

                            )}

                        </div>

                    </section>

                </div>
            )}


            {/* ================= TECHNICAL ================= */}
            {activeTab === "technical" && (

                <section>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">
                            Technical Questions
                        </h2>

                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Questions likely to be asked based on your
                            target role.
                        </p>
                    </div>


                    <div className="space-y-4">

                        {report.technicalQuestions?.map(
                            (item, index) => {

                                const isOpen =
                                    openQuestion === `technical-${index}`;

                                return (
                                    <div
                                        key={index}
                                        className="hr-card overflow-hidden"
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenQuestion(
                                                    isOpen
                                                        ? null
                                                        : `technical-${index}`
                                                )
                                            }
                                            className="w-full p-5 flex items-center justify-between text-left"
                                        >

                                            <div className="flex gap-4">

                                                <span className="text-violet-400 font-semibold">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <span className="font-medium">
                                                    {item.question}
                                                </span>

                                            </div>

                                            <ChevronDown
                                                className={`shrink-0 transition ${
                                                    isOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />

                                        </button>


                                        {isOpen && (

                                            <div className="px-5 pb-6 ml-10 space-y-5">

                                                <div>
                                                    <p className="text-xs uppercase tracking-wider text-violet-400 mb-2">
                                                        Interviewer Intention
                                                    </p>

                                                    <p className="text-zinc-400 leading-6">
                                                        {item.intention}
                                                    </p>
                                                </div>


                                                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">

                                                    <p className="text-xs uppercase tracking-wider text-violet-400 mb-2">
                                                        How to Answer
                                                    </p>

                                                    <p className="text-zinc-600 dark:text-zinc-300 leading-6">
                                                        {item.answer}
                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                    </div>
                                );
                            }
                        )}

                    </div>

                </section>
            )}


            {/* ================= BEHAVIORAL ================= */}
            {activeTab === "behavioral" && (

                <section>

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Behavioral Questions
                        </h2>

                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Prepare strong answers using the STAR method.
                        </p>

                    </div>


                    <div className="space-y-4">

                        {report.behavioralQuestions?.map(
                            (item, index) => {

                                const isOpen =
                                    openQuestion === `behavioral-${index}`;

                                return (

                                    <div
                                        key={index}
                                        className="hr-card overflow-hidden"
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenQuestion(
                                                    isOpen
                                                        ? null
                                                        : `behavioral-${index}`
                                                )
                                            }
                                            className="w-full p-5 flex items-center justify-between text-left"
                                        >

                                            <div className="flex gap-4">

                                                <span className="text-pink-400 font-semibold">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                                <span className="font-medium">
                                                    {item.question}
                                                </span>

                                            </div>

                                            <ChevronDown
                                                className={`shrink-0 transition ${
                                                    isOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />

                                        </button>


                                        {isOpen && (

                                            <div className="px-5 pb-6 ml-10 space-y-5">

                                                <div>

                                                    <p className="text-xs uppercase tracking-wider text-pink-400 mb-2">
                                                        Interviewer Intention
                                                    </p>

                                                    <p className="text-zinc-400 leading-6">
                                                        {item.intention}
                                                    </p>

                                                </div>


                                                <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10">

                                                    <p className="text-xs uppercase tracking-wider text-pink-400 mb-2">
                                                        How to Answer
                                                    </p>

                                                    <p className="text-zinc-600 dark:text-zinc-300 leading-6">
                                                        {item.answer}
                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                );
                            }
                        )}

                    </div>

                </section>
            )}


            {/* ================= SKILL GAPS ================= */}
            {activeTab === "skills" && (

                <section>

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Skill Gaps
                        </h2>

                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Skills you should improve before the interview.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {report.skillGaps?.length > 0 ? (

                            report.skillGaps.map((gap, index) => (

                                <div
                                    key={index}
                                    className="hr-card p-6"
                                >

                                    <div className="flex justify-between items-center mb-5">

                                        <div className="p-3 rounded-xl bg-orange-500/10">
                                            <AlertTriangle
                                                size={20}
                                                className="text-orange-400"
                                            />
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                gap.severity === "high"
                                                    ? "bg-red-500/10 text-red-400"
                                                    : gap.severity === "medium"
                                                    ? "bg-yellow-500/10 text-yellow-400"
                                                    : "bg-green-500/10 text-green-400"
                                            }`}
                                        >
                                            {gap.severity.toUpperCase()}
                                        </span>

                                    </div>

                                    <h3 className="text-lg font-semibold">
                                        {gap.skill}
                                    </h3>

                                </div>

                            ))

                        ) : (

                            <div className="col-span-full text-center py-16">

                                <CheckCircle2
                                    size={48}
                                    className="mx-auto text-emerald-400 mb-4"
                                />

                                <h3 className="text-xl font-semibold">
                                    Great job!
                                </h3>

                                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                    No significant skill gaps were detected.
                                </p>

                            </div>

                        )}

                    </div>

                </section>
            )}


            {/* ================= PREPARATION PLAN ================= */}
            {activeTab === "plan" && (

                <section>

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Preparation Plan
                        </h2>

                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Follow this plan to prepare systematically.
                        </p>

                    </div>


                    <div className="space-y-5">

                        {report.preparationPlan?.map((plan) => {

                            const completed =
                                completedDays.includes(plan.day);

                            return (

                                <div
                                    key={plan.day}
                                    className={`rounded-2xl border p-6 transition ${
                                        completed
                                            ? "border-emerald-500/20 bg-emerald-500/5"
                                            : "border-zinc-200 bg-white dark:border-white/10 dark:bg-[#111113]"
                                    }`}
                                >

                                    <div className="flex flex-col md:flex-row md:items-start gap-5">

                                        <button
                                            onClick={() =>
                                                toggleDay(plan.day)
                                            }
                                            className="shrink-0"
                                        >

                                            {completed ? (

                                                <CheckCircle2
                                                    size={32}
                                                    className="text-emerald-400"
                                                />

                                            ) : (

                                                <Circle
                                                    size={32}
                                                    className="text-zinc-600 hover:text-violet-400 transition"
                                                />

                                            )}

                                        </button>


                                        <div className="flex-1">

                                            <div className="flex flex-wrap items-center gap-3 mb-2">

                                                <span className="text-sm text-violet-400 font-semibold">
                                                    DAY {plan.day}
                                                </span>

                                                <h3 className="text-xl font-semibold">
                                                    {plan.focus}
                                                </h3>

                                            </div>


                                            <div className="space-y-3 mt-5">

                                                {plan.tasks?.map(
                                                    (task, index) => (

                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300"
                                                        >

                                                            <CheckCircle2
                                                                size={18}
                                                                className="text-zinc-500 mt-0.5 shrink-0"
                                                            />

                                                            <span>
                                                                {task}
                                                            </span>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </section>
            )}

                        {showPdfPreview && (
                <div className="
                    fixed inset-0 z-50
                    bg-black/80
                    flex items-center justify-center
                    p-4
                ">

                    <div className="
                        relative
                        w-full
                        max-w-5xl
                        h-[90vh]
                        bg-white
                        rounded-2xl
                        overflow-hidden
                        border border-zinc-200
                        dark:bg-zinc-900
                        dark:border-white/10
                    ">

                        <button
                            onClick={() => setShowPdfPreview(false)}
                            className="
                                absolute right-4 top-4 z-10
                                w-10 h-10
                                rounded-full
                                bg-black/70
                                text-white
                                hover:bg-black
                            "
                        >
                            ✕
                        </button>

                        <iframe
                            src={report.pdf.url}
                            title="Resume PDF Preview"
                            className="w-full h-full"
                        />

                    </div>

                </div>
            )}
        </main>

    </PageShell>
  );
};


export default InterviewStrategy;
