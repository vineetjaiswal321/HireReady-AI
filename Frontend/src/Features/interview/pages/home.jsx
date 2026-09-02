import React, { useRef, useState } from "react";
import {
    ArrowRight,
    ArrowLeft,
    Upload,
    FileText,
    Check,
    Sparkles,
    BrainCircuit,
    Target,
    ShieldCheck,
    Zap,
    ChevronDown,
    Loader2,
    X,
    CheckCircle2,
    Circle,
    BriefcaseBusiness,
    UserRound,
    Settings2,
    MessageSquareText,
    BarChart3,
    Code2,
    Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../hooks/useInterview.hooks.js";
import PageShell from "../../layout/PageShell.jsx";


const Home = () => {
    const navigate = useNavigate();

    const {
        loading,
        generateReport,
    } = useInterview();

    const fileInputRef = useRef(null);

    const [step, setStep] = useState(1);
    const [resume, setResume] = useState(null);
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("Entry Level");
    const [interviewType, setInterviewType] = useState("Full Interview");
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");

    const steps = [
        {
            id: 1,
            title: "Resume",
            description: "Your experience",
            icon: FileText,
        },
        {
            id: 2,
            title: "About you",
            description: "Your story",
            icon: UserRound,
        },
        {
            id: 3,
            title: "Target role",
            description: "Job description",
            icon: BriefcaseBusiness,
        },
        {
            id: 4,
            title: "Preferences",
            description: "Interview setup",
            icon: Settings2,
        },
    ];

    const handleFile = (file) => {
        setError("");

        if (!file) return;

        if (file.type !== "application/pdf") {
            setError("Please upload a PDF resume.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("Resume must be smaller than 10MB.");
            return;
        }

        setResume(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        handleFile(file);
    };

    const validateStep = () => {
        setError("");

        if (step === 1 && !resume) {
            setError("Please upload your resume before continuing.");
            return false;
        }

        if (step === 2 && selfDescription.trim().length < 20) {
            setError("Please tell us a little more about yourself.");
            return false;
        }

        if (step === 3 && jobDescription.trim().length < 30) {
            setError("Please provide the job description.");
            return false;
        }

        return true;
    };

    const nextStep = () => {
        if (!validateStep()) return;

        if (step < 4) {
            setStep(step + 1);
            window.scrollTo({
                top: 550,
                behavior: "smooth",
            });
        }
    };

    const previousStep = () => {
        setError("");

        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleGenerateReport = async () => {
        setError("");

        if (!resume) {
            setError("Please upload your resume.");
            setStep(1);
            return;
        }

        if (selfDescription.trim().length < 20) {
            setError("Please provide a little more information about yourself.");
            setStep(2);
            return;
        }

        if (jobDescription.trim().length < 30) {
            setError("Please provide a valid job description.");
            setStep(3);
            return;
        }

        try {
            const report = await generateReport({
                resumeFile: resume,
                selfDescription,
                jobDescription,
                experienceLevel,
                interviewType,
            });

            navigate(`/interview/${report._id}`);
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    error?.message ||
                    "Unable to generate your interview strategy. Please try again."
            );
        }
    };

    return (
        <PageShell variant="home">

            <section className="relative px-6 pb-16 pt-28 md:pt-32">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200">
                        <Sparkles size={13} className="text-violet-600 dark:text-violet-400" />
                        AI-powered interview preparation
                        <ArrowRight size={12} className="text-zinc-400" />
                    </div>

                    <h1 className="mt-7 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-zinc-950 md:text-7xl dark:text-white">
                        Turn your resume into
                        <span className="mt-3 block text-violet-700 dark:text-violet-400">
                            interview confidence.
                        </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
                        HireReady AI analyzes your resume, the job you're targeting, and your experience to build a personalized interview strategy.
                    </p>

                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <a
                            href="#builder"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
                        >
                            Build my interview plan
                            <ArrowRight size={16} />
                        </a>

                        <a
                            href="#how-it-works"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                            See how it works
                            <ChevronDown size={15} />
                        </a>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                            Resume analysis
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                            AI-generated questions
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                            Personalized preparation
                        </div>
                    </div>
                </div>
            </section>

            <section id="builder" className="relative mx-auto max-w-7xl px-5 pb-28 md:px-6">
                <div className="mb-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                                <span className="text-xs font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                                    INTERVIEW BUILDER
                                </span>
                            </div>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                                Let's build your strategy.
                            </h2>

                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                Give HireReady a little context. We'll handle the rest.
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-[10px] font-medium tracking-widest text-zinc-500 dark:text-zinc-500">
                                PROFILE COMPLETION
                            </p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {step * 25}% complete
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-violet-600 transition-all duration-500"
                            style={{ width: `${step * 25}%` }}
                        />
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 md:px-7 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                HireReady workspace
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            <ShieldCheck size={13} />
                            Your information stays private
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_280px]">
                        <aside className="border-b border-zinc-200 bg-zinc-50/80 p-5 lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-zinc-950/40">
                            <p className="mb-5 text-[10px] font-semibold tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                                YOUR PROFILE
                            </p>

                            <div className="space-y-2">
                                {steps.map((item) => {
                                    const Icon = item.icon;
                                    const active = step === item.id;
                                    const completed = step > item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                if (item.id <= step) {
                                                    setStep(item.id);
                                                    setError("");
                                                }
                                            }}
                                            className={`w-full rounded-xl border p-3 text-left transition ${
                                                active
                                                    ? "border-violet-600 bg-violet-50 dark:border-violet-500/40 dark:bg-violet-500/10"
                                                    : "border-transparent hover:bg-white dark:hover:bg-white/[0.04]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                                        completed
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                                            : active
                                                              ? "bg-violet-600 text-white"
                                                              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    {completed ? <Check size={15} /> : <Icon size={15} />}
                                                </div>

                                                <div>
                                                    <p
                                                        className={`text-sm font-medium ${
                                                            active
                                                                ? "text-zinc-950 dark:text-white"
                                                                : "text-zinc-700 dark:text-zinc-300"
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-8 hidden rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900 lg:block">
                                <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                                <p className="mt-3 text-xs font-semibold text-zinc-950 dark:text-white">
                                    Pro tip
                                </p>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    The more context you provide, the more personalized your interview questions will be.
                                </p>
                            </div>
                        </aside>

                        <main className="flex min-h-[590px] flex-col">
                            {step === 1 && (
                                <ResumeStep
                                    resume={resume}
                                    fileInputRef={fileInputRef}
                                    dragActive={dragActive}
                                    setDragActive={setDragActive}
                                    handleDrop={handleDrop}
                                    handleFile={handleFile}
                                    setResume={setResume}
                                />
                            )}

                            {step === 2 && (
                                <AboutStep
                                    selfDescription={selfDescription}
                                    setSelfDescription={setSelfDescription}
                                />
                            )}

                            {step === 3 && (
                                <JobStep
                                    jobDescription={jobDescription}
                                    setJobDescription={setJobDescription}
                                />
                            )}

                            {step === 4 && (
                                <PreferencesStep
                                    experienceLevel={experienceLevel}
                                    setExperienceLevel={setExperienceLevel}
                                    interviewType={interviewType}
                                    setInterviewType={setInterviewType}
                                />
                            )}

                            {error && (
                                <div className="mx-7 mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 md:mx-10 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                                    <X size={15} />
                                    {error}
                                </div>
                            )}

                            <div className="mt-auto flex items-center justify-between border-t border-zinc-200 p-5 dark:border-white/10">
                                <button
                                    onClick={previousStep}
                                    disabled={step === 1 || loading}
                                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                                >
                                    <ArrowLeft size={15} />
                                    Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        onClick={nextStep}
                                        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                                    >
                                        Continue
                                        <ArrowRight size={15} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={16} />
                                                Generate Strategy
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </main>

                        <aside className="hidden border-l border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-950/50 lg:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
                                    <BrainCircuit size={17} className="text-violet-600 dark:text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">AI Context</p>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                        Live profile analysis
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 space-y-2">
                                <ContextItem title="Resume" completed={!!resume} />
                                <ContextItem
                                    title="About you"
                                    completed={selfDescription.trim().length > 0}
                                />
                                <ContextItem
                                    title="Target role"
                                    completed={jobDescription.trim().length > 0}
                                />
                                <ContextItem title="Preferences" completed={step === 4} />
                            </div>

                            <div className="my-7 h-px bg-zinc-200 dark:bg-white/10" />

                            <p className="text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
                                AI WILL GENERATE
                            </p>

                            <div className="mt-4 space-y-3">
                                <PreviewItem icon={Target} title="Match score" description="Resume vs job" />
                                <PreviewItem
                                    icon={MessageSquareText}
                                    title="Interview questions"
                                    description="Technical + behavioral"
                                />
                                <PreviewItem icon={Search} title="Skill gaps" description="What to improve" />
                                <PreviewItem
                                    icon={BarChart3}
                                    title="Preparation plan"
                                    description="Day-by-day roadmap"
                                />
                            </div>

                            <div className="mt-7 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                                <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                                <p className="mt-3 text-xs font-semibold">Built around you</p>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    HireReady doesn't give you generic interview questions. It creates questions based on your actual experience and target role.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <FeaturesSection />
            <HowItWorks />
            <FinalCTA />
            <Footer />
        </PageShell>
    );
};


const StepHeader = ({ number, eyebrow, title, description }) => {
    return (
        <div>
            <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-medium text-violet-700 dark:text-violet-400">
                    {number}
                </span>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
                    {eyebrow}
                </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-white">
                {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
        </div>
    );
};


const ResumeStep = ({
    resume,
    fileInputRef,
    dragActive,
    setDragActive,
    handleDrop,
    handleFile,
    setResume,
}) => {
    return (
        <div className="flex-1 p-7 md:p-10">
            <StepHeader
                number="01"
                eyebrow="YOUR EXPERIENCE"
                title="Start with your resume"
                description="Upload your resume and we'll extract your skills, experience, projects and technical background."
            />

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => {
                    setDragActive(false);
                }}
                onDrop={handleDrop}
                onClick={() => !resume && fileInputRef.current?.click()}
                className={`mt-10 flex min-h-[290px] items-center justify-center rounded-xl border border-dashed transition ${
                    dragActive
                        ? "border-violet-600 bg-violet-50 dark:border-violet-500 dark:bg-violet-500/10"
                        : resume
                          ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10"
                          : "border-zinc-300 bg-zinc-50 hover:border-violet-500 hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-950 dark:hover:border-violet-500/50 dark:hover:bg-zinc-900"
                } ${!resume ? "cursor-pointer" : ""}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) => handleFile(e.target.files?.[0])}
                />

                {resume ? (
                    <div className="px-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                            <Check size={27} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="mt-5 break-all text-sm font-semibold">{resume.name}</h3>
                        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                            {(resume.size / 1024 / 1024).toFixed(2)} MB · PDF
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            >
                                Replace
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setResume(null);
                                }}
                                className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition hover:text-red-600 dark:hover:text-red-400"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
                            <Upload size={25} className="text-violet-600 dark:text-violet-400" />
                        </div>
                        <h3 className="mt-5 text-sm font-semibold">Drop your resume here</h3>
                        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                            PDF only · Maximum 10MB
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100">
                            <Upload size={13} />
                            Browse files
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 dark:text-zinc-500">
                <ShieldCheck size={13} />
                Your resume is only used to generate your interview strategy.
            </div>
        </div>
    );
};


const AboutStep = ({ selfDescription, setSelfDescription }) => {
    return (
        <div className="flex-1 p-7 md:p-10">
            <StepHeader
                number="02"
                eyebrow="YOUR STORY"
                title="Tell us about yourself"
                description="Your resume tells us what you've done. This helps us understand who you are."
            />

            <div className="mt-10">
                <div className="relative">
                    <textarea
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        maxLength={1500}
                        rows={11}
                        autoFocus
                        placeholder={`Example:

I'm a Full Stack Developer who enjoys building scalable web applications. I've worked with React, Node.js, Express and MongoDB.

Recently I built an AI-powered interview preparation platform. I'm particularly interested in backend architecture and improving my problem-solving skills.`}
                        className="w-full resize-none rounded-xl border border-zinc-300 bg-white p-6 text-sm leading-relaxed text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-600 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-500"
                    />
                    <div className="absolute bottom-4 right-5 text-[11px] font-medium text-zinc-500">
                        {selfDescription.length}/1500
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {["Your strengths", "Recent projects", "Career goals", "What you're learning"].map(
                        (item) => (
                            <div
                                key={item}
                                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400"
                            >
                                {item}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};


const JobStep = ({ jobDescription, setJobDescription }) => {
    return (
        <div className="flex-1 p-7 md:p-10">
            <StepHeader
                number="03"
                eyebrow="TARGET ROLE"
                title="What role are you targeting?"
                description="Paste the job description. HireReady will identify the skills and expectations you need to prepare for."
            />

            <div className="relative mt-10">
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    maxLength={5000}
                    rows={13}
                    autoFocus
                    placeholder={`Paste the job description here...

Example:

We are looking for a Full Stack Developer with experience in React, Node.js, Express and MongoDB...

Responsibilities:
- Build scalable web applications
- Develop REST APIs
- Work with MongoDB
- Implement authentication
- Collaborate with engineering teams`}
                    className="w-full resize-none rounded-xl border border-zinc-300 bg-white p-6 text-sm leading-relaxed text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-600 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-500"
                />
                <div className="absolute bottom-4 right-5 text-[11px] font-medium text-zinc-500">
                    {jobDescription.length}/5000
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <Target size={13} />
                Include responsibilities and required skills for better results.
            </div>
        </div>
    );
};


const PreferencesStep = ({
    experienceLevel,
    setExperienceLevel,
    interviewType,
    setInterviewType,
}) => {
    const experienceOptions = ["Entry Level", "Junior", "Mid Level", "Senior", "Lead"];

    const interviewOptions = [
        {
            value: "Full Interview",
            description: "Technical + behavioral",
        },
        {
            value: "Technical",
            description: "Coding + technical concepts",
        },
        {
            value: "Behavioral",
            description: "HR + behavioral questions",
        },
        {
            value: "System Design",
            description: "Architecture + scalability",
        },
    ];

    return (
        <div className="flex-1 p-7 md:p-10">
            <StepHeader
                number="04"
                eyebrow="PERSONALIZE"
                title="Make the preparation yours"
                description="Tell HireReady what kind of interview you're preparing for."
            />

            <div className="mt-10 space-y-9">
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-medium">Experience level</p>
                        <span className="text-[11px] font-medium text-zinc-500">Choose one</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {experienceOptions.map((option) => {
                            const active = experienceLevel === option;

                            return (
                                <button
                                    type="button"
                                    key={option}
                                    onClick={() => setExperienceLevel(option)}
                                    className={`rounded-xl border p-3.5 text-left transition ${
                                        active
                                            ? "border-violet-600 bg-violet-50 dark:border-violet-500/50 dark:bg-violet-500/10"
                                            : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs ${
                                                active
                                                    ? "font-semibold text-zinc-950 dark:text-white"
                                                    : "font-medium text-zinc-700 dark:text-zinc-300"
                                            }`}
                                        >
                                            {option}
                                        </span>
                                        {active && <Check size={14} className="text-violet-500" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className="mb-3 text-sm font-medium">Interview focus</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {interviewOptions.map((option) => {
                            const active = interviewType === option.value;

                            return (
                                <button
                                    type="button"
                                    key={option.value}
                                    onClick={() => setInterviewType(option.value)}
                                    className={`rounded-xl border p-4 text-left transition ${
                                        active
                                            ? "border-violet-600 bg-violet-50 dark:border-violet-500/50 dark:bg-violet-500/10"
                                            : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-sm ${
                                                active
                                                    ? "font-semibold text-zinc-950 dark:text-white"
                                                    : "font-medium text-zinc-800 dark:text-zinc-200"
                                            }`}
                                        >
                                            {option.value}
                                        </span>
                                        {active ? (
                                            <Check size={15} className="text-violet-500" />
                                        ) : (
                                            <Circle size={15} className="text-zinc-300 dark:text-zinc-600" />
                                        )}
                                    </div>
                                    <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                                        {option.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ContextItem = ({ title, completed }) => {
    return (
        <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
                {completed ? (
                    <CheckCircle2 size={15} className="text-emerald-500 dark:text-green-400" />
                ) : (
                    <Circle size={15} className="text-zinc-300 dark:text-zinc-600" />
                )}
                <span
                    className={`text-xs ${
                        completed
                            ? "font-medium text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-500"
                    }`}
                >
                    {title}
                </span>
            </div>
            <span
                className={`text-[10px] font-medium ${
                    completed ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"
                }`}
            >
                {completed ? "Ready" : "Waiting"}
            </span>
        </div>
    );
};


const PreviewItem = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
                <Icon size={14} className="text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{title}</p>
                <p className="mt-1 text-[10px] text-zinc-500">{description}</p>
            </div>
        </div>
    );
};


const FeaturesSection = () => {
    const features = [
        {
            icon: BarChart3,
            title: "Resume Match Score",
            description: "See how closely your experience matches the role you're targeting.",
        },
        {
            icon: MessageSquareText,
            title: "Personalized Questions",
            description: "Get technical and behavioral questions generated around your actual profile.",
        },
        {
            icon: Search,
            title: "Skill Gap Detection",
            description: "Identify the skills you should improve before stepping into the interview.",
        },
        {
            icon: Code2,
            title: "Technical Preparation",
            description: "Prepare for the technologies, concepts and problems most relevant to the role.",
        },
        {
            icon: Target,
            title: "Focused Preparation",
            description: "Stop studying everything. Focus on what actually matters for your target job.",
        },
        {
            icon: Zap,
            title: "AI-Powered",
            description: "Turn hours of manual preparation into a personalized strategy in seconds.",
        },
    ];

    return (
        <section
            id="features"
            className="relative border-y border-violet-100/80 py-28 px-6 dark:border-white/[0.05]"
        >
            <div className="mx-auto max-w-6xl">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                        <span className="text-xs font-semibold tracking-[0.2em] text-violet-600 dark:text-violet-300">
                            WHAT YOU GET
                        </span>
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                        Everything you need
                        <span className="text-slate-400 dark:text-zinc-500"> to prepare smarter.</span>
                    </h2>
                </div>

                <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3 dark:border-white/[0.06] dark:bg-white/[0.06]">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="bg-white p-7 transition hover:bg-violet-50/70 dark:bg-[#07070b] dark:hover:bg-white/[0.03]"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 dark:border-violet-400/10 dark:bg-violet-500/[0.07]">
                                    <Icon size={18} className="text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="mt-6 text-sm font-medium">{feature.title}</h3>
                                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-zinc-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Share your profile",
            description: "Upload your resume and tell HireReady about your experience.",
        },
        {
            number: "02",
            title: "Add your target role",
            description: "Paste the job description so AI understands what the company needs.",
        },
        {
            number: "03",
            title: "Get your strategy",
            description: "Receive your match score, questions, skill gaps and preparation plan.",
        },
    ];

    return (
        <section id="how-it-works" className="relative px-6 py-28">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <span className="text-xs font-semibold tracking-[0.2em] text-violet-600 dark:text-violet-300">
                        HOW IT WORKS
                    </span>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                        From resume to ready.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 dark:text-zinc-500">
                        No generic preparation checklist. HireReady builds a strategy specifically around your profile.
                    </p>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-3">
                    {steps.map((item) => (
                        <div
                            key={item.number}
                            className="relative rounded-2xl border border-slate-200 bg-white/90 p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(124,58,237,0.1)] dark:border-white/[0.07] dark:bg-white/[0.015] dark:shadow-none"
                        >
                            <span className="font-mono text-xs text-violet-600 dark:text-violet-400">
                                {item.number}
                            </span>
                            <h3 className="mt-7 text-lg font-medium">{item.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-zinc-500">
                                {item.description}
                            </p>
                            <div className="absolute top-8 right-8 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.06]">
                                <ArrowRight size={14} className="text-slate-400 dark:text-zinc-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const FinalCTA = () => {
    return (
        <section className="relative px-6 pb-28">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-violet-200 bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 p-10 text-center md:p-16 dark:border-violet-400/10 dark:from-violet-500/[0.09] dark:via-[#0c0b14] dark:to-fuchsia-500/[0.06]">
                <div className="pointer-events-none absolute top-[-150px] left-[30%] h-[400px] w-[400px] rounded-full bg-violet-400/20 blur-[100px] dark:bg-violet-500/10" />

                <Sparkles size={22} className="relative mx-auto text-violet-600 dark:text-violet-400" />

                <h2 className="relative mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
                    Your next interview
                    <span className="block text-slate-400 dark:text-zinc-500">
                        deserves better preparation.
                    </span>
                </h2>

                <p className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    Stop guessing what to prepare. Give HireReady your profile and let AI build your interview strategy.
                </p>

                <a
                    href="#builder"
                    className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(124,58,237,0.28)] transition hover:bg-[#6D28D9] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                    Start preparing
                    <ArrowRight size={16} />
                </a>
            </div>
        </section>
    );
};


const Footer = () => {
    return (
        <footer className="border-t border-slate-200 dark:border-white/[0.05]">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white">
                        <Sparkles size={14} />
                    </div>
                    <span className="text-sm font-medium">
                        HireReady
                        <span className="text-violet-600 dark:text-violet-400">AI</span>
                    </span>
                </div>

                <p className="text-xs text-slate-400 dark:text-zinc-600">
                    Built to help you interview better.
                </p>

                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="text-slate-400 transition hover:text-slate-800 dark:text-zinc-500 dark:hover:text-white"
                    >
                        <Code2 size={18} />
                    </a>
                    <a
                        href="#"
                        className="text-slate-400 transition hover:text-slate-800 dark:text-zinc-500 dark:hover:text-white"
                    >
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};


export default Home;
