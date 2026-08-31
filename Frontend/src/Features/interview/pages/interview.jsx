import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    Loader2,
    ArrowRight,
    BarChart3,
    BrainCircuit,
    Briefcase,
    AlertTriangle,
    BriefcaseBusiness,
    Check,
    CheckCircle2,
    ChevronDown,
    Circle,
    Code2,
    FileText,
    MessageSquare,
    Search,
    Settings2,
    ShieldCheck,
    Sparkles,
    Target,
    UserRound,
    Zap,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useInterview } from "../../hooks/useInterview.hooks";


const InterviewStrategy = () => {
  const navigate = useNavigate();

  const { interviewId }=useParams()

  const {
        report,
        loading,
        getReportById
  } = useInterview();


  const [activeTab, setActiveTab] = useState("overview");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);

    useEffect(() => {

        if (!interviewId) return;

        console.log("Interview ID:", interviewId);

        getReportById(interviewId);

    }, [interviewId]);


  if (loading) {
      return (
          <div className="min-h-screen bg-[#08080d] text-white flex items-center justify-center">
              <div className="text-center">
                  <Loader2
                      size={40}
                      className="animate-spin mx-auto mb-4"
                  />

                  <h2 className="text-xl font-semibold">
                      Preparing your interview strategy...
                  </h2>

                  <p className="text-zinc-400 mt-2">
                      Analyzing your resume and target role
                  </p>
              </div>
          </div>
      );
  }
  

  const toggleDay = (day) => {
    setCompletedDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  if (!report) {
    return (
        <div className="min-h-screen bg-[#08080d] text-white flex items-center justify-center">

            <div className="text-center">

                <h2 className="text-2xl font-bold">
                    No interview strategy found
                </h2>

                <p className="text-zinc-400 mt-2 mb-6">
                    Generate an interview strategy first.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition"
                >
                    Create Strategy
                </button>

            </div>

        </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#08080d] text-white">

        {/* ================= HEADER ================= */}
        <header className="border-b border-white/10 bg-[#0b0b12]/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="flex items-center gap-2">
                    <BrainCircuit className="text-violet-400" size={24} />
                    <span className="font-bold text-lg">
                        HireReady AI
                    </span>
                </div>

            </div>
        </header>


        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto px-6 py-10">

            {/* ================= HERO ================= */}
            <section className="mb-10">

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                    <div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-4">
                            <Sparkles size={14} />
                            AI Interview Strategy
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Your Interview
                            <span className="text-violet-400">
                                {" "}Strategy
                            </span>
                        </h1>

                        <p className="text-zinc-400 mt-4 max-w-2xl">
                            A personalized preparation plan generated from
                            your resume, experience and target job.
                        </p>

                    </div>


                    {/* Match Score */}
                    <div className="relative">

                        <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 flex flex-col items-center justify-center">

                            <span className="text-4xl font-bold text-white">
                                {report.matchScore ?? 0}%
                            </span>

                            <span className="text-sm text-zinc-400 mt-1">
                                Profile Match
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= OVERVIEW CARDS ================= */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

                {/* Experience */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

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
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

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
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-orange-500/10">
                            <Briefcase size={20} className="text-orange-400" />
                        </div>

                        <span className="text-zinc-400 text-sm">
                            Target Role
                        </span>
                    </div>

                    <p className="text-lg font-semibold">
                        Full Stack Developer
                    </p>

                </div>

            </section>


            {/* ================= TABS ================= */}
            <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto">

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
                                ? "text-violet-400 border-violet-400"
                                : "text-zinc-500 border-transparent hover:text-white"
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
                    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">

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

                        <p className="text-zinc-300 leading-7">
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
                                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
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

                                    <p className="text-zinc-300">
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

                        <p className="text-zinc-400 mt-2">
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
                                        className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
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

                                                    <p className="text-zinc-300 leading-6">
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

                        <p className="text-zinc-400 mt-2">
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
                                        className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
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

                                                    <p className="text-zinc-300 leading-6">
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

                        <p className="text-zinc-400 mt-2">
                            Skills you should improve before the interview.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {report.skillGaps?.length > 0 ? (

                            report.skillGaps.map((gap, index) => (

                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
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

                                <p className="text-zinc-400 mt-2">
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

                        <p className="text-zinc-400 mt-2">
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
                                            : "border-white/10 bg-white/[0.03]"
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
                                                            className="flex items-start gap-3 text-zinc-300"
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

        </main>

    </div>
  );
};


/* ---------------- COMPONENTS ---------------- */

const Priority = ({ number, title, description }) => (
  <div className="priority">

    <div className="priority-number">
      {number}
    </div>

    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>

  </div>
);


const Snapshot = ({ icon, label, value }) => (
  <div className="snapshot">

    <div className="snapshot-left">
      {icon}
      {label}
    </div>

    <strong>{value}</strong>

  </div>
);


const Severity = ({ severity }) => (
  <span className={`severity ${severity}`}>
    {severity}
  </span>
);


const QuestionGroup = ({
  title,
  icon,
  questions,
  openQuestion,
  toggleQuestion,
  offset,
}) => (
  <div className="question-group">

    <div className="question-group-header">
      {icon}
      <h2>{title}</h2>
    </div>

    {questions.map((item, index) => {

      const id = index + offset;
      const isOpen = openQuestion === id;

      return (
        <div className="question-card" key={id}>

          <button
            className="question-button"
            onClick={() => toggleQuestion(id)}
          >

            <div className="question-title">

              <span className="question-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item.question}</span>

            </div>

            {isOpen ? (
              <X size={17} />
            ) : (
              <ChevronDown size={17} />
            )}

          </button>

          {isOpen && (
            <div className="question-answer">

              <div className="answer-block intention">

                <strong>INTERVIEWER INTENTION</strong>

                <p>{item.intention}</p>

              </div>

              <div className="answer-block">

                <strong>HOW TO ANSWER</strong>

                <p>{item.answer}</p>

              </div>

            </div>
          )}

        </div>
      );
    })}

  </div>
);


const BuildingIcon = () => (
  <div
    style={{
      width: 17,
      height: 17,
      display: "grid",
      placeItems: "center",
      fontSize: 14,
    }}
  >
    🏢
  </div>
);


export default InterviewStrategy;