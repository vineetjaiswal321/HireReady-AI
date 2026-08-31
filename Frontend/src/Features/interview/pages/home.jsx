import React, { useRef, useState, useContext } from "react";
import {
    ArrowRight,
    ArrowLeft,
    Upload,
    Bell, 
    User, 
    FileText, 
    Settings,
    LogOut,     
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
import { AuthContext } from "../../auth/auth.context.jsx";


// ============================================================
// MAIN HOME PAGE
// ============================================================

const Home = () => {

    const navigate = useNavigate();

    const {
        loading,
        generateReport
    } = useInterview();


    const fileInputRef = useRef(null);

    const [step, setStep] = useState(1);

    const [resume, setResume] = useState(null);

    const [selfDescription, setSelfDescription] = useState("");

    const [jobDescription, setJobDescription] = useState("");

    const [experienceLevel, setExperienceLevel] =
        useState("Entry Level");

    const [interviewType, setInterviewType] =
        useState("Full Interview");

    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");


    // ========================================================
    // STEPS
    // ========================================================

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


    // ========================================================
    // FILE HANDLING
    // ========================================================

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


    // ========================================================
    // VALIDATION
    // ========================================================

    const validateStep = () => {

        setError("");

        if (step === 1 && !resume) {
            setError("Please upload your resume before continuing.");
            return false;
        }

        if (step === 2 && selfDescription.trim().length < 20) {
            setError(
                "Please tell us a little more about yourself."
            );
            return false;
        }

        if (step === 3 && jobDescription.trim().length < 30) {
            setError(
                "Please provide the job description."
            );
            return false;
        }

        return true;
    };


    // ========================================================
    // NEXT STEP
    // ========================================================

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


    // ========================================================
    // PREVIOUS STEP
    // ========================================================

    const previousStep = () => {

        setError("");

        if (step > 1) {
            setStep(step - 1);
        }
    };


    // ========================================================
    // GENERATE INTERVIEW REPORT
    // ========================================================

    const handleGenerateReport = async () => {

    setError("");

    // Validate all required fields
    if (!resume) {
        setError("Please upload your resume.");
        setStep(1);
        return;
    }

    if (selfDescription.trim().length < 20) {
        setError(
            "Please provide a little more information about yourself."
        );
        setStep(2);
        return;
    }

    if (jobDescription.trim().length < 30) {
        setError(
            "Please provide a valid job description."
        );
        setStep(3);
        return;
    }

    try {

        const report = await generateReport({
            resumeFile: resume,
            selfDescription,
            jobDescription,
            experienceLevel,
            interviewType
        });

        navigate(`/interview/${report._id}`);

    } catch (error) {

        console.error(
            "Failed to generate interview report:",
            error
        );

        setError(
            error?.response?.data?.message ||
            error?.message ||
            "Unable to generate your interview strategy. Please try again."
        );
    }
};


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="min-h-screen bg-[#050507] text-white overflow-hidden">


            {/* ==================================================
                BACKGROUND
            ================================================== */}

            <div className="fixed inset-0 pointer-events-none">

                <div className="absolute top-[-300px] left-[20%] w-[700px] h-[700px] bg-violet-600/[0.08] rounded-full blur-[140px]" />

                <div className="absolute top-[500px] right-[-200px] w-[600px] h-[600px] bg-fuchsia-600/[0.05] rounded-full blur-[140px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />

            </div>


            {/* ==================================================
                NAVBAR
            ================================================== */}

            <Navbar />


            {/* ==================================================
                HERO
            ================================================== */}

            <section className="relative pt-28 pb-20 px-6">

                <div className="max-w-5xl mx-auto text-center">


                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-400/20 bg-violet-500/[0.06] text-violet-300 text-xs">

                        <Sparkles size={13} />

                        AI-powered interview preparation

                        <ArrowRight size={12} />

                    </div>


                    {/* Heading */}

                    <h1 className="mt-7 text-5xl md:text-7xl font-semibold tracking-[-0.05em] leading-[0.95]">

                        Turn your resume into

                        <span className="block mt-3 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">

                            interview confidence.

                        </span>

                    </h1>


                    {/* Description */}

                    <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg text-gray-500 leading-relaxed">

                        HireReady AI analyzes your resume, the job you're
                        targeting, and your experience to build a personalized
                        interview strategy.

                    </p>


                    {/* Hero CTA */}

                    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">

                        <a
                            href="#builder"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                        >

                            Build my interview plan

                            <ArrowRight size={16} />

                        </a>


                        <a
                            href="#how-it-works"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-300 text-sm hover:bg-white/[0.05] transition"
                        >

                            See how it works

                            <ChevronDown size={15} />

                        </a>

                    </div>


                    {/* Stats */}

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-12 text-xs text-gray-600">

                        <div className="flex items-center gap-2">

                            <CheckCircle2
                                size={14}
                                className="text-green-400"
                            />

                            Resume analysis

                        </div>

                        <div className="flex items-center gap-2">

                            <CheckCircle2
                                size={14}
                                className="text-green-400"
                            />

                            AI-generated questions

                        </div>

                        <div className="flex items-center gap-2">

                            <CheckCircle2
                                size={14}
                                className="text-green-400"
                            />

                            Personalized preparation

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                BUILDER
            ================================================== */}

            <section
                id="builder"
                className="relative max-w-7xl mx-auto px-5 md:px-6 pb-28"
            >

                <div className="mb-8">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-2">

                                <Sparkles
                                    size={14}
                                    className="text-violet-400"
                                />

                                <span className="text-xs tracking-[0.2em] text-violet-300 font-semibold">
                                    INTERVIEW BUILDER
                                </span>

                            </div>

                            <h2 className="text-3xl md:text-4xl font-semibold mt-3 tracking-tight">

                                Let's build your strategy.

                            </h2>

                            <p className="text-sm text-gray-600 mt-2">
                                Give HireReady a little context. We'll handle the rest.
                            </p>

                        </div>


                        <div className="text-left md:text-right">

                            <p className="text-[10px] text-gray-600 tracking-widest">
                                PROFILE COMPLETION
                            </p>

                            <p className="text-sm text-gray-300 mt-1">
                                {step * 25}% complete
                            </p>

                        </div>

                    </div>


                    {/* Progress */}

                    <div className="mt-6 h-1 bg-white/[0.05] rounded-full overflow-hidden">

                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                            style={{
                                width: `${step * 25}%`,
                            }}
                        />

                    </div>

                </div>


                {/* ==================================================
                    MAIN BUILDER CARD
                ================================================== */}

                <div className="rounded-[28px] border border-white/[0.08] bg-[#0a0a10]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">


                    {/* TOP BAR */}

                    <div className="border-b border-white/[0.07] px-5 md:px-7 py-4 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />

                            <span className="text-xs text-gray-500">
                                HireReady workspace
                            </span>

                        </div>


                        <div className="flex items-center gap-2 text-xs text-gray-600">

                            <ShieldCheck size={13} />

                            Your information stays private

                        </div>

                    </div>


                    {/* BUILDER GRID */}

                    <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_280px]">


                        {/* ==================================================
                            LEFT SIDEBAR
                        ================================================== */}

                        <aside className="border-b lg:border-b-0 lg:border-r border-white/[0.07] p-5">

                            <p className="text-[10px] tracking-[0.2em] text-gray-600 font-semibold mb-5">
                                YOUR PROFILE
                            </p>


                            <div className="space-y-2">

                                {steps.map((item) => {

                                    const Icon = item.icon;

                                    const active =
                                        step === item.id;

                                    const completed =
                                        step > item.id;

                                    return (

                                        <button
                                            key={item.id}
                                            onClick={() => {

                                                if (
                                                    item.id <= step
                                                ) {
                                                    setStep(item.id);
                                                    setError("");
                                                }

                                            }}
                                            className={`w-full text-left p-3 rounded-xl border transition
                                            ${
                                                active
                                                    ? "border-violet-400/20 bg-violet-500/[0.08]"
                                                    : "border-transparent hover:bg-white/[0.025]"
                                            }`}
                                        >

                                            <div className="flex items-center gap-3">

                                                <div
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center
                                                    ${
                                                        completed
                                                            ? "bg-green-500/10 text-green-400"
                                                            : active
                                                            ? "bg-violet-500 text-white"
                                                            : "bg-white/[0.04] text-gray-600"
                                                    }`}
                                                >

                                                    {completed ? (
                                                        <Check size={15} />
                                                    ) : (
                                                        <Icon size={15} />
                                                    )}

                                                </div>


                                                <div>

                                                    <p
                                                        className={`text-sm font-medium ${
                                                            active
                                                                ? "text-white"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </p>

                                                    <p className="text-[11px] text-gray-600 mt-0.5">
                                                        {item.description}
                                                    </p>

                                                </div>

                                            </div>

                                        </button>

                                    );

                                })}

                            </div>


                            {/* Tip */}

                            <div className="hidden lg:block mt-8 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.015]">

                                <Sparkles
                                    size={16}
                                    className="text-violet-400"
                                />

                                <p className="text-xs font-medium mt-3">
                                    Pro tip
                                </p>

                                <p className="text-xs text-gray-600 leading-relaxed mt-2">
                                    The more context you provide, the more
                                    personalized your interview questions will be.
                                </p>

                            </div>

                        </aside>


                        {/* ==================================================
                            CENTER CONTENT
                        ================================================== */}

                        <main className="min-h-[590px] flex flex-col">


                            {/* STEP 1 */}

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


                            {/* STEP 2 */}

                            {step === 2 && (

                                <AboutStep
                                    selfDescription={selfDescription}
                                    setSelfDescription={setSelfDescription}
                                />

                            )}


                            {/* STEP 3 */}

                            {step === 3 && (

                                <JobStep
                                    jobDescription={jobDescription}
                                    setJobDescription={setJobDescription}
                                />

                            )}


                            {/* STEP 4 */}

                            {step === 4 && (

                                <PreferencesStep
                                    experienceLevel={experienceLevel}
                                    setExperienceLevel={setExperienceLevel}
                                    interviewType={interviewType}
                                    setInterviewType={setInterviewType}
                                />

                            )}


                            {/* ERROR */}

                            {error && (

                                <div className="mx-7 md:mx-10 mb-5 p-3.5 rounded-xl border border-red-400/20 bg-red-500/[0.05] text-sm text-red-300 flex items-center gap-2">

                                    <X size={15} />

                                    {error}

                                </div>

                            )}


                            {/* SUCCESS */}

                            {!loading && (

                                <div className="mx-7 md:mx-10 mb-5 p-4 rounded-xl border border-green-400/20 bg-green-500/[0.05]">

                                    <div className="flex items-center gap-3">

                                        <CheckCircle2
                                            size={20}
                                            className="text-green-400"
                                        />

                                        <div>

                                            <p className="text-sm font-medium">
                                                Interview strategy generated!
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Your personalized report is ready.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* ==================================================
                                NAVIGATION
                            ================================================== */}

                            <div className="mt-auto border-t border-white/[0.07] p-5 flex items-center justify-between">

                                <button
                                    onClick={previousStep}
                                    disabled={step === 1 || loading}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white disabled:opacity-20 transition"
                                >

                                    <ArrowLeft size={15} />

                                    Back

                                </button>


                                {step < 4 ? (

                                    <button
                                        onClick={nextStep}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                                    >

                                        Continue

                                        <ArrowRight size={15} />

                                    </button>

                                ) : (

                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={loading}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition shadow-xl shadow-violet-500/20"
                                    >

                                        {loading ? (

                                            <>
                                                <Loader2
                                                    size={16}
                                                    className="animate-spin"
                                                />

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


                        {/* ==================================================
                            RIGHT AI PANEL
                        ================================================== */}

                        <aside className="hidden lg:block border-l border-white/[0.07] p-6 bg-white/[0.012]">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-xl bg-violet-500/[0.1] border border-violet-400/20 flex items-center justify-center">

                                    <BrainCircuit
                                        size={17}
                                        className="text-violet-400"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-medium">
                                        AI Context
                                    </p>

                                    <p className="text-[11px] text-gray-600">
                                        Live profile analysis
                                    </p>

                                </div>

                            </div>


                            {/* Context */}

                            <div className="mt-7 space-y-2">

                                <ContextItem
                                    title="Resume"
                                    completed={!!resume}
                                />

                                <ContextItem
                                    title="About you"
                                    completed={
                                        selfDescription.trim().length > 0
                                    }
                                />

                                <ContextItem
                                    title="Target role"
                                    completed={
                                        jobDescription.trim().length > 0
                                    }
                                />

                                <ContextItem
                                    title="Preferences"
                                    completed={step === 4}
                                />

                            </div>


                            {/* Divider */}

                            <div className="h-px bg-white/[0.06] my-7" />


                            {/* AI Preview */}

                            <p className="text-[10px] tracking-[0.2em] text-gray-600 font-semibold">
                                AI WILL GENERATE
                            </p>


                            <div className="space-y-3 mt-4">

                                <PreviewItem
                                    icon={Target}
                                    title="Match score"
                                    description="Resume vs job"
                                />

                                <PreviewItem
                                    icon={MessageSquareText}
                                    title="Interview questions"
                                    description="Technical + behavioral"
                                />

                                <PreviewItem
                                    icon={Search}
                                    title="Skill gaps"
                                    description="What to improve"
                                />

                                <PreviewItem
                                    icon={BarChart3}
                                    title="Preparation plan"
                                    description="Day-by-day roadmap"
                                />

                            </div>


                            {/* Bottom AI card */}

                            <div className="mt-7 p-4 rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.07] to-fuchsia-500/[0.03]">

                                <Sparkles
                                    size={16}
                                    className="text-violet-400"
                                />

                                <p className="text-xs font-medium mt-3">
                                    Built around you
                                </p>

                                <p className="text-xs text-gray-600 leading-relaxed mt-2">
                                    HireReady doesn't give you generic interview
                                    questions. It creates questions based on
                                    your actual experience and target role.
                                </p>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>


            {/* ==================================================
                FEATURES
            ================================================== */}

            <FeaturesSection />


            {/* ==================================================
                HOW IT WORKS
            ================================================== */}

            <HowItWorks />


            {/* ==================================================
                FINAL CTA
            ================================================== */}

            <FinalCTA />


            {/* ==================================================
                FOOTER
            ================================================== */}

            <Footer />

        </div>
    );
};


// ============================================================
// NAVBAR
// ============================================================

const Navbar = () => {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);

    

    const { logout, user } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };
    return (

        <nav className="relative z-50 border-b border-white/[0.05]">

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}

                <a
                    href="#"
                    className="flex items-center gap-2.5"
                >

                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">

                        <Sparkles size={16} />

                    </div>

                    <span className="font-semibold tracking-tight">
                        HireReady
                        <span className="text-violet-400">
                            AI
                        </span>
                    </span>

                </a>


                {/* Links */}

                <div className="hidden md:flex items-center gap-7">

                    <a
                        href="#builder"
                        className="text-xs text-gray-500 hover:text-white transition"
                    >
                        Interview Builder
                    </a>

                    <a
                        href="#how-it-works"
                        className="text-xs text-gray-500 hover:text-white transition"
                    >
                        How it works
                    </a>

                    <a
                        href="#features"
                        className="text-xs text-gray-500 hover:text-white transition"
                    >
                        Features
                    </a>

                </div>


                {/* CTA */}

                <div className="relative">

                <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-zinc-800 transition"
                >
                    <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
                        <User size={18} />
                    </div>

                    <ChevronDown
                        size={15}
                        className={`text-zinc-400 transition-transform ${
                            profileOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>


                {profileOpen && (
                    <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">

                        {/* User */}
                        <div className="p-4 border-b border-zinc-800">
                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                <div className="w-10 h-10 shrink-0 rounded-full bg-violet-600 flex items-center justify-center">
                                    <User size={19} />
                                </div>

                                {/* User Info */}
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">
                                        {user?.username || "User"}
                                    </p>

                                    <p className="text-xs text-zinc-500 mt-1 truncate">
                                        {user?.email || "No email"}
                                    </p>

                                    <p className="text-xs text-zinc-500 mt-2">
                                        Manage your account
                                    </p>
                                </div>

                            </div>
                        </div>


                        {/* Menu */}
                        <div className="p-2">

                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-sm text-left"
                            >
                                <User size={17} className="text-zinc-400" />
                                Profile
                            </button>


                            <button
                                onClick={() => navigate("/reports")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-sm text-left"
                            >
                                <FileText size={17} className="text-zinc-400" />
                                Recent Reports
                            </button>


                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-800 text-sm text-left"
                            >
                                <Settings size={17} className="text-zinc-400" />
                                Settings
                            </button>

                        </div>


                        {/* Logout */}
                        <div className="border-t border-zinc-800 p-2">

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 text-sm text-left"
                            >
                                <LogOut size={17} />
                                Logout
                            </button>

                        </div>

                    </div>
                )}

                </div>

            </div>

        </nav>

    );
};


// ============================================================
// STEP HEADER
// ============================================================

const StepHeader = ({
    number,
    eyebrow,
    title,
    description,
}) => {

    return (

        <div>

            <div className="flex items-center gap-3">

                <span className="text-xs text-violet-400 font-mono">
                    {number}
                </span>

                <span className="text-[10px] tracking-[0.2em] text-gray-600 font-semibold">
                    {eyebrow}
                </span>

            </div>


            <h2 className="text-2xl md:text-3xl font-semibold mt-4 tracking-tight">
                {title}
            </h2>


            <p className="max-w-xl text-sm text-gray-500 leading-relaxed mt-3">
                {description}
            </p>

        </div>

    );
};


// ============================================================
// RESUME STEP
// ============================================================

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


            {/* Upload */}

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => {
                    setDragActive(false);
                }}
                onDrop={handleDrop}
                onClick={() =>
                    !resume &&
                    fileInputRef.current?.click()
                }
                className={`mt-10 min-h-[290px] rounded-2xl border border-dashed flex items-center justify-center transition
                ${
                    dragActive
                        ? "border-violet-400 bg-violet-500/[0.07]"
                        : resume
                        ? "border-green-400/20 bg-green-500/[0.025]"
                        : "border-white/[0.1] bg-white/[0.015] hover:bg-white/[0.025] hover:border-violet-400/30"
                }
                ${
                    !resume
                        ? "cursor-pointer"
                        : ""
                }`}
            >

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) =>
                        handleFile(
                            e.target.files?.[0]
                        )
                    }
                />


                {resume ? (

                    <div className="text-center px-6">

                        <div className="mx-auto w-16 h-16 rounded-2xl bg-green-500/[0.08] border border-green-400/20 flex items-center justify-center">

                            <Check
                                size={27}
                                className="text-green-400"
                            />

                        </div>


                        <h3 className="text-sm font-medium mt-5 break-all">
                            {resume.name}
                        </h3>


                        <p className="text-xs text-gray-600 mt-2">

                            {(resume.size / 1024 / 1024).toFixed(
                                2
                            )}{" "}
                            MB · PDF

                        </p>


                        <div className="flex items-center justify-center gap-3 mt-5">

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="text-xs px-3 py-2 rounded-lg border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.04]"
                            >
                                Replace
                            </button>


                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setResume(null);
                                }}
                                className="text-xs px-3 py-2 rounded-lg text-gray-600 hover:text-red-400"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="text-center px-6">

                        <div className="mx-auto w-16 h-16 rounded-2xl bg-violet-500/[0.08] border border-violet-400/20 flex items-center justify-center">

                            <Upload
                                size={25}
                                className="text-violet-400"
                            />

                        </div>


                        <h3 className="text-sm font-medium mt-5">
                            Drop your resume here
                        </h3>


                        <p className="text-xs text-gray-600 mt-2">
                            PDF only · Maximum 10MB
                        </p>


                        <div className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-gray-300">

                            <Upload size={13} />

                            Browse files

                        </div>

                    </div>

                )}

            </div>


            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-600">

                <ShieldCheck size={13} />

                Your resume is only used to generate your interview strategy.

            </div>

        </div>

    );
};


// ============================================================
// ABOUT STEP
// ============================================================

const AboutStep = ({
    selfDescription,
    setSelfDescription,
}) => {

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
                        onChange={(e) =>
                            setSelfDescription(
                                e.target.value
                            )
                        }
                        maxLength={1500}
                        rows={11}
                        autoFocus
                        placeholder={`Example:

I'm a Full Stack Developer who enjoys building scalable web applications. I've worked with React, Node.js, Express and MongoDB.

Recently I built an AI-powered interview preparation platform. I'm particularly interested in backend architecture and improving my problem-solving skills.`}
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-sm text-gray-200 placeholder:text-gray-700 outline-none resize-none focus:border-violet-400/30 focus:bg-violet-500/[0.02] transition leading-relaxed"
                    />


                    <div className="absolute bottom-4 right-5 text-[11px] text-gray-700">
                        {selfDescription.length}/1500
                    </div>

                </div>


                <div className="flex flex-wrap gap-2 mt-4">

                    {[
                        "Your strengths",
                        "Recent projects",
                        "Career goals",
                        "What you're learning",
                    ].map((item) => (

                        <div
                            key={item}
                            className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.015] text-[11px] text-gray-600"
                        >
                            {item}
                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
};


// ============================================================
// JOB STEP
// ============================================================

const JobStep = ({
    jobDescription,
    setJobDescription,
}) => {

    return (

        <div className="flex-1 p-7 md:p-10">

            <StepHeader
                number="03"
                eyebrow="TARGET ROLE"
                title="What role are you targeting?"
                description="Paste the job description. HireReady will identify the skills and expectations you need to prepare for."
            />


            <div className="mt-10 relative">

                <textarea
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(
                            e.target.value
                        )
                    }
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
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-sm text-gray-200 placeholder:text-gray-700 outline-none resize-none focus:border-violet-400/30 focus:bg-violet-500/[0.02] transition leading-relaxed"
                />


                <div className="absolute bottom-4 right-5 text-[11px] text-gray-700">
                    {jobDescription.length}/5000
                </div>

            </div>


            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-600">

                <Target size={13} />

                Include responsibilities and required skills for better results.

            </div>

        </div>

    );
};


// ============================================================
// PREFERENCES STEP
// ============================================================

const PreferencesStep = ({
    experienceLevel,
    setExperienceLevel,
    interviewType,
    setInterviewType,
}) => {

    const experienceOptions = [
        "Entry Level",
        "Junior",
        "Mid Level",
        "Senior",
        "Lead",
    ];

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


                {/* Experience */}

                <div>

                    <div className="flex items-center justify-between mb-3">

                        <p className="text-sm font-medium">
                            Experience level
                        </p>

                        <span className="text-[11px] text-gray-600">
                            Choose one
                        </span>

                    </div>


                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">

                        {experienceOptions.map(
                            (option) => {

                                const active =
                                    experienceLevel === option;

                                return (

                                    <button
                                        type="button"
                                        key={option}
                                        onClick={() =>
                                            setExperienceLevel(
                                                option
                                            )
                                        }
                                        className={`p-3.5 rounded-xl border text-left transition
                                        ${
                                            active
                                                ? "border-violet-400/30 bg-violet-500/[0.08]"
                                                : "border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.035]"
                                        }`}
                                    >

                                        <div className="flex items-center justify-between">

                                            <span
                                                className={`text-xs ${
                                                    active
                                                        ? "text-white"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {option}
                                            </span>

                                            {active && (
                                                <Check
                                                    size={14}
                                                    className="text-violet-400"
                                                />
                                            )}

                                        </div>

                                    </button>

                                );
                            }
                        )}

                    </div>

                </div>


                {/* Interview type */}

                <div>

                    <p className="text-sm font-medium mb-3">
                        Interview focus
                    </p>


                    <div className="grid sm:grid-cols-2 gap-3">

                        {interviewOptions.map(
                            (option) => {

                                const active =
                                    interviewType ===
                                    option.value;

                                return (

                                    <button
                                        type="button"
                                        key={option.value}
                                        onClick={() =>
                                            setInterviewType(
                                                option.value
                                            )
                                        }
                                        className={`p-4 rounded-xl border text-left transition
                                        ${
                                            active
                                                ? "border-violet-400/30 bg-violet-500/[0.08]"
                                                : "border-white/[0.07] bg-white/[0.015] hover:bg-white/[0.035]"
                                        }`}
                                    >

                                        <div className="flex items-center justify-between">

                                            <span
                                                className={`text-sm ${
                                                    active
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {option.value}
                                            </span>

                                            {active ? (
                                                <Check
                                                    size={15}
                                                    className="text-violet-400"
                                                />
                                            ) : (
                                                <Circle
                                                    size={15}
                                                    className="text-gray-700"
                                                />
                                            )}

                                        </div>


                                        <p className="text-[11px] text-gray-600 mt-2">
                                            {option.description}
                                        </p>

                                    </button>

                                );

                            }
                        )}

                    </div>

                </div>

            </div>

        </div>

    );
};


// ============================================================
// CONTEXT ITEM
// ============================================================

const ContextItem = ({
    title,
    completed,
}) => {

    return (

        <div className="flex items-center justify-between py-2.5">

            <div className="flex items-center gap-2.5">

                {completed ? (

                    <CheckCircle2
                        size={15}
                        className="text-green-400"
                    />

                ) : (

                    <Circle
                        size={15}
                        className="text-gray-700"
                    />

                )}

                <span
                    className={`text-xs ${
                        completed
                            ? "text-gray-300"
                            : "text-gray-600"
                    }`}
                >
                    {title}
                </span>

            </div>


            <span
                className={`text-[10px] ${
                    completed
                        ? "text-green-400"
                        : "text-gray-700"
                }`}
            >
                {completed
                    ? "Ready"
                    : "Waiting"}
            </span>

        </div>

    );
};


// ============================================================
// PREVIEW ITEM
// ============================================================

const PreviewItem = ({
    icon: Icon,
    title,
    description,
}) => {

    return (

        <div className="flex gap-3">

            <div className="w-8 h-8 shrink-0 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">

                <Icon
                    size={14}
                    className="text-gray-500"
                />

            </div>


            <div>

                <p className="text-xs text-gray-400">
                    {title}
                </p>

                <p className="text-[10px] text-gray-700 mt-1">
                    {description}
                </p>

            </div>

        </div>

    );
};


// ============================================================
// FEATURES
// ============================================================

const FeaturesSection = () => {

    const features = [
        {
            icon: BarChart3,
            title: "Resume Match Score",
            description:
                "See how closely your experience matches the role you're targeting.",
        },
        {
            icon: MessageSquareText,
            title: "Personalized Questions",
            description:
                "Get technical and behavioral questions generated around your actual profile.",
        },
        {
            icon: Search,
            title: "Skill Gap Detection",
            description:
                "Identify the skills you should improve before stepping into the interview.",
        },
        {
            icon: Code2,
            title: "Technical Preparation",
            description:
                "Prepare for the technologies, concepts and problems most relevant to the role.",
        },
        {
            icon: Target,
            title: "Focused Preparation",
            description:
                "Stop studying everything. Focus on what actually matters for your target job.",
        },
        {
            icon: Zap,
            title: "AI-Powered",
            description:
                "Turn hours of manual preparation into a personalized strategy in seconds.",
        },
    ];


    return (

        <section
            id="features"
            className="relative border-y border-white/[0.05] py-28 px-6"
        >

            <div className="max-w-6xl mx-auto">


                <div className="max-w-xl">

                    <div className="flex items-center gap-2">

                        <Sparkles
                            size={14}
                            className="text-violet-400"
                        />

                        <span className="text-xs tracking-[0.2em] text-violet-300 font-semibold">
                            WHAT YOU GET
                        </span>

                    </div>


                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4">

                        Everything you need

                        <span className="text-gray-600">
                            {" "}to prepare smarter.
                        </span>

                    </h2>

                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] mt-16 border border-white/[0.06] overflow-hidden rounded-2xl">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="bg-[#07070b] p-7 hover:bg-white/[0.025] transition"
                            >

                                <div className="w-10 h-10 rounded-xl bg-violet-500/[0.07] border border-violet-400/10 flex items-center justify-center">

                                    <Icon
                                        size={18}
                                        className="text-violet-400"
                                    />

                                </div>


                                <h3 className="text-sm font-medium mt-6">
                                    {feature.title}
                                </h3>


                                <p className="text-xs text-gray-600 leading-relaxed mt-3">
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


// ============================================================
// HOW IT WORKS
// ============================================================

const HowItWorks = () => {

    const steps = [
        {
            number: "01",
            title: "Share your profile",
            description:
                "Upload your resume and tell HireReady about your experience.",
        },
        {
            number: "02",
            title: "Add your target role",
            description:
                "Paste the job description so AI understands what the company needs.",
        },
        {
            number: "03",
            title: "Get your strategy",
            description:
                "Receive your match score, questions, skill gaps and preparation plan.",
        },
    ];


    return (

        <section
            id="how-it-works"
            className="relative py-28 px-6"
        >

            <div className="max-w-6xl mx-auto">

                <div className="text-center">

                    <span className="text-xs tracking-[0.2em] text-violet-300 font-semibold">
                        HOW IT WORKS
                    </span>

                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4">
                        From resume to ready.
                    </h2>

                    <p className="text-sm text-gray-600 max-w-xl mx-auto mt-4">
                        No generic preparation checklist. HireReady builds a
                        strategy specifically around your profile.
                    </p>

                </div>


                <div className="grid md:grid-cols-3 gap-5 mt-16">

                    {steps.map((item) => (

                        <div
                            key={item.number}
                            className="relative p-7 rounded-2xl border border-white/[0.07] bg-white/[0.015]"
                        >

                            <span className="text-xs font-mono text-violet-400">
                                {item.number}
                            </span>


                            <h3 className="text-lg font-medium mt-7">
                                {item.title}
                            </h3>


                            <p className="text-sm text-gray-600 leading-relaxed mt-3">
                                {item.description}
                            </p>


                            <div className="absolute top-8 right-8 w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center">

                                <ArrowRight
                                    size={14}
                                    className="text-gray-700"
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
};


// ============================================================
// FINAL CTA
// ============================================================

const FinalCTA = () => {

    return (

        <section className="relative px-6 pb-28">

            <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[28px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.09] via-[#0c0b14] to-fuchsia-500/[0.06] p-10 md:p-16 text-center">

                <div className="absolute top-[-150px] left-[30%] w-[400px] h-[400px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />


                <Sparkles
                    size={22}
                    className="mx-auto text-violet-400"
                />


                <h2 className="relative text-3xl md:text-5xl font-semibold tracking-tight mt-6">

                    Your next interview

                    <span className="block text-gray-600">
                        deserves better preparation.
                    </span>

                </h2>


                <p className="relative max-w-xl mx-auto text-sm text-gray-500 leading-relaxed mt-5">

                    Stop guessing what to prepare. Give HireReady your profile
                    and let AI build your interview strategy.

                </p>


                <a
                    href="#builder"
                    className="relative inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                >

                    Start preparing

                    <ArrowRight size={16} />

                </a>

            </div>

        </section>

    );
};


// ============================================================
// FOOTER
// ============================================================

const Footer = () => {

    return (

        <footer className="border-t border-white/[0.05]">

            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

                <div className="flex items-center gap-2.5">

                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">

                        <Sparkles size={14} />

                    </div>

                    <span className="text-sm font-medium">
                        HireReady
                        <span className="text-violet-400">
                            AI
                        </span>
                    </span>

                </div>


                <p className="text-xs text-gray-700">
                    Built to help you interview better.
                </p>


                <div className="flex items-center gap-4">

                    <a
                        href="#"
                        className="text-gray-600 hover:text-white transition"
                    >
                        <Code2 size={18} />
                    </a>

                    <a
                        href="#"
                        className="text-gray-600 hover:text-white transition"
                    >
                        <ArrowRight size={18} />
                    </a>

                </div>

            </div>

        </footer>

    );
};


export default Home;