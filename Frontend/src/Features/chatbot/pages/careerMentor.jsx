import { useEffect, useRef, useState } from "react";
import {
    ArrowUp,
    Bot,
    BrainCircuit,
    BriefcaseBusiness,
    ChevronRight,
    Code2,
    Loader2,
    MessageCircle,
    Plus,
    Sparkles,
    Target,
    User,
} from "lucide-react";

import PageShell from "../../layout/PageShell.jsx";


const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


const suggestions = [
    {
        icon: Target,
        title: "Build an SDE roadmap",
        text: "Create a practical roadmap for becoming a software engineer.",
    },
    {
        icon: Code2,
        title: "Improve my DSA",
        text: "Help me create a structured DSA preparation plan.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Prepare for interviews",
        text: "How should I prepare for technical and behavioral interviews?",
    },
    {
        icon: BrainCircuit,
        title: "Find my skill gaps",
        text: "What skills should I improve for software engineering roles?",
    },
];


const CareerMentor = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);


    const sendMessage = async (message = input) => {

        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) return;

        setError("");
        setInput("");

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: trimmedMessage,
            },
        ]);

        setLoading(true);

        try {

            const response = await fetch(`${API_URL}/api/mentor/chat`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                credentials: "include",

                body: JSON.stringify({
                    conversationId,
                    message: trimmedMessage,
                }),
            });


            const result = await response.json();


            if (!response.ok) {
                throw new Error(
                    result?.message || "Unable to get a response from the mentor."
                );
            }


            setConversationId(result.data.conversationId);


            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: result.data.response,
                },
            ]);

        } catch (error) {

            setError(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };


    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };


    const startNewChat = () => {
        setMessages([]);
        setConversationId(null);
        setInput("");
        setError("");
    };


    return (
        <PageShell>

            <main className="mx-auto flex h-[calc(100vh-64px)] max-w-7xl flex-col px-3 py-3 sm:px-5 lg:px-7">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <header className="mb-3 flex shrink-0 items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">

                            <Sparkles size={19} />

                            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#090b10]" />

                        </div>


                        <div>

                            <div className="flex items-center gap-2">

                                <h1 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Career Mentor
                                </h1>

                                <span className="hidden rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-600 sm:inline-flex dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
                                    AI Powered
                                </span>

                            </div>

                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                Your personal software engineering career guide
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={startNewChat}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:border-violet-500/30 dark:hover:text-violet-400"
                    >
                        <Plus size={14} />
                        <span className="hidden sm:inline">
                            New chat
                        </span>
                    </button>

                </header>


                {/* ================================================= */}
                {/* CHAT CONTAINER */}
                {/* ================================================= */}

                <section className="relative flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-white/[0.07] dark:bg-[#0d1017]">


                    {/* ============================================= */}
                    {/* LEFT INFO PANEL */}
                    {/* ============================================= */}

                    <aside className="hidden w-[235px] shrink-0 border-r border-zinc-200 bg-zinc-50/70 p-4 lg:block dark:border-white/[0.06] dark:bg-white/[0.015]">

                        <div className="mb-5">

                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500">
                                HireReady AI
                            </p>

                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                                Career guidance,
                                <br />
                                tailored to you.
                            </h2>

                        </div>


                        <div className="space-y-2">

                            {[
                                ["Career planning", "Plan your next move"],
                                ["Interview prep", "Technical + behavioral"],
                                ["DSA & coding", "Build problem-solving skills"],
                                ["Projects", "Improve your portfolio"],
                            ].map(([title, description]) => (

                                <div
                                    key={title}
                                    className="rounded-xl border border-zinc-200/70 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.025]"
                                >

                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                        {title}
                                    </p>

                                    <p className="mt-0.5 text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                                        {description}
                                    </p>

                                </div>

                            ))}

                        </div>


                        <div className="mt-5 rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-3.5 dark:border-violet-500/10 dark:from-violet-500/[0.07] dark:to-indigo-500/[0.03]">

                            <Sparkles
                                size={15}
                                className="text-violet-500"
                            />

                            <p className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                Profile-aware guidance
                            </p>

                            <p className="mt-1 text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                                Your mentor can use your HireReady profile
                                to give more relevant career advice.
                            </p>

                        </div>

                    </aside>


                    {/* ============================================= */}
                    {/* CHAT AREA */}
                    {/* ============================================= */}

                    <div className="flex min-w-0 flex-1 flex-col">


                        {/* ========================================= */}
                        {/* MESSAGES */}
                        {/* ========================================= */}

                        <div className="min-h-0 flex-1 overflow-y-auto">

                            {messages.length === 0 ? (

                                <div className="flex min-h-full flex-col items-center justify-center px-5 py-8">

                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/20">
                                        <Bot size={27} />
                                    </div>


                                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                        How can I help your career?
                                    </h2>

                                    <p className="mt-1.5 max-w-md text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Ask me about SDE preparation, DSA,
                                        interviews, projects, resumes,
                                        learning roadmaps, or career planning.
                                    </p>


                                    <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">

                                        {suggestions.map((suggestion) => {

                                            const Icon = suggestion.icon;

                                            return (
                                                <button
                                                    key={suggestion.title}
                                                    type="button"
                                                    onClick={() => sendMessage(suggestion.text)}
                                                    className="group flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 text-left transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/5 dark:border-white/[0.07] dark:bg-white/[0.025] dark:hover:border-violet-500/30"
                                                >

                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                                        <Icon size={15} />
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                                            {suggestion.title}
                                                        </p>

                                                        <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                                                            {suggestion.text}
                                                        </p>

                                                    </div>

                                                    <ChevronRight
                                                        size={14}
                                                        className="mt-1 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500"
                                                    />

                                                </button>
                                            );

                                        })}

                                    </div>

                                </div>

                            ) : (

                                <div className="mx-auto w-full max-w-3xl space-y-5 px-4 py-6 sm:px-7">

                                    {messages.map((message, index) => (

                                        <div
                                            key={index}
                                            className={`flex gap-3 ${
                                                message.role === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >

                                            {message.role === "model" && (

                                                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                                                    <Sparkles size={14} />
                                                </div>

                                            )}


                                            <div
                                                className={
                                                    message.role === "user"
                                                        ? "max-w-[82%] rounded-2xl rounded-tr-md bg-gradient-to-br from-violet-600 to-indigo-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm"
                                                        : "max-w-[82%] rounded-2xl rounded-tl-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-800 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-zinc-200"
                                                }
                                            >
                                                <div className="whitespace-pre-wrap">
                                                    {message.text}
                                                </div>
                                            </div>


                                            {message.role === "user" && (

                                                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                                                    <User size={14} />
                                                </div>

                                            )}

                                        </div>

                                    ))}


                                    {loading && (

                                        <div className="flex gap-3">

                                            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                                                <Sparkles size={14} />
                                            </div>

                                            <div className="rounded-2xl rounded-tl-md border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.035]">

                                                <div className="flex items-center gap-1.5">

                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500" />
                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:120ms]" />
                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:240ms]" />

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                    <div ref={messagesEndRef} />

                                </div>

                            )}

                        </div>


                        {/* ========================================= */}
                        {/* ERROR */}
                        {/* ========================================= */}

                        {error && (

                            <div className="mx-auto mb-2 w-full max-w-3xl px-4 sm:px-7">

                                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400">
                                    {error}
                                </div>

                            </div>

                        )}


                        {/* ========================================= */}
                        {/* INPUT */}
                        {/* ========================================= */}

                        <div className="border-t border-zinc-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[#0d1017] sm:p-4">

                            <form
                                onSubmit={handleSubmit}
                                className="mx-auto max-w-3xl"
                            >

                                <div className="relative flex items-end rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.025] dark:focus-within:border-violet-500/40">

                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        rows={1}
                                        placeholder="Ask your Career Mentor..."
                                        disabled={loading}
                                        className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed dark:text-white dark:placeholder:text-zinc-500"
                                    />


                                    <button
                                        type="submit"
                                        disabled={!input.trim() || loading}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Send message"
                                    >

                                        {loading ? (
                                            <Loader2
                                                size={16}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <ArrowUp size={17} />
                                        )}

                                    </button>

                                </div>


                                <div className="mt-2 flex items-center justify-between px-1">

                                    <p className="text-[9px] text-zinc-400 dark:text-zinc-500">
                                        Career Mentor can make mistakes. Verify important information.
                                    </p>

                                    <span className="hidden text-[9px] text-zinc-400 sm:block">
                                        Enter to send · Shift + Enter for new line
                                    </span>

                                </div>

                            </form>

                        </div>

                    </div>

                </section>

            </main>

        </PageShell>
    );
};


export default CareerMentor;