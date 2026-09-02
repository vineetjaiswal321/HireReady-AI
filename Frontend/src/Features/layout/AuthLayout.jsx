import { CheckCircle2, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "../context/themeContext.jsx";

const AuthLayout = ({
    children,
    heading,
    subheading,
    highlights = [],
}) => {
    const { isDark, setTheme } = useTheme();

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F7F7F8] text-zinc-950 antialiased dark:bg-[#09090B] dark:text-zinc-50">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-600/20" />
                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/15 blur-[120px] dark:bg-indigo-600/20" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8 sm:px-6">
                <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-2 dark:border-white/10 dark:bg-[#111113] dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                    <div className="relative hidden flex-col justify-between bg-zinc-950 p-8 text-white xl:p-10 lg:flex">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.35),transparent_45%)]" />

                        <div className="relative z-10 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
                                <Sparkles size={20} />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                HireReady
                                <span className="text-violet-400">AI</span>
                            </span>
                        </div>

                        <div className="relative z-10 max-w-md">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-200">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                                AI-powered career preparation
                            </div>

                            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight xl:text-5xl">
                                {heading}
                            </h1>

                            <p className="mt-6 text-base leading-relaxed text-zinc-400">
                                {subheading}
                            </p>

                            {highlights.length > 0 && (
                                <div className="mt-8 space-y-3">
                                    {highlights.map((item) => (
                                        <div key={item} className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10">
                                                <CheckCircle2 size={16} className="text-violet-400" />
                                            </div>
                                            <span className="text-sm text-zinc-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p className="relative z-10 text-sm text-zinc-500">
                            © 2026 HireReady AI. Prepare smarter. Perform better.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center p-5 sm:p-8 lg:p-10">
                        <button
                            type="button"
                            onClick={() => setTheme(isDark ? "Light" : "Dark")}
                            aria-label="Toggle theme"
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        <div className="w-full max-w-md">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
