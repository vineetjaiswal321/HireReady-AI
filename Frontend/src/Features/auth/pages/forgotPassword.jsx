import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react";
import AuthLayout from "../../layout/AuthLayout.jsx";
import {forgotPassword} from "../services/auth.api.js"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            await forgotPassword({ email });

            setSuccess(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            heading={
                <>
                    Get back to your
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        preparation.
                    </span>
                </>
            }
            subheading="Reset your password and continue preparing for your next interview with HireReadyAI."
            highlights={[
                "AI-powered mock interviews",
                "Personalized performance insights",
                "Track your interview progress",
            ]}
        >
            <div className="mb-8 lg:hidden">
                <p className="text-lg font-semibold tracking-tight">
                    HireReady
                    <span className="text-violet-600 dark:text-violet-400">
                        AI
                    </span>
                </p>
            </div>

            <div className="mb-8">
                <Link
                    to="/login"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                >
                    <ArrowLeft size={16} />
                    Back to login
                </Link>

                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                    Forgot password?
                </h2>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Enter your email and we'll send you a link to reset your
                    password.
                </p>
            </div>

            {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="flex items-start gap-3">
                        <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        />

                        <div>
                            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                Check your email
                            </p>

                            <p className="mt-1 text-sm leading-6 text-emerald-700 dark:text-emerald-400">
                                If an account exists with this email, we've
                                sent you a password reset link.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setSuccess(false);
                            setEmail("");
                        }}
                        className="mt-5 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                    >
                        Try another email
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                Sending reset link...
                            </>
                        ) : (
                            "Send reset link"
                        )}
                    </button>
                </form>
            )}

            <p className="mt-7 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Remember your password?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                >
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}

export default ForgotPassword;