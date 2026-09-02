import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import AuthLayout from "../../layout/AuthLayout.jsx";
import { resetPassword } from "../services/auth.api.js";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({
                token,
                password,
            });

            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Reset link is invalid or expired"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            heading={
                <>
                    A fresh start for
                    <br />
                    your{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        next interview.
                    </span>
                </>
            }
            subheading="Create a new password and get back to your interview preparation."
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
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                >
                    <ArrowLeft size={16} />
                    Back to login
                </Link>

                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                    Reset password
                </h2>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Choose a new password for your HireReadyAI account.
                </p>
            </div>

            {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <div className="flex items-start gap-3">
                        <CheckCircle2
                            size={20}
                            className="mt-0.5 text-emerald-600 dark:text-emerald-400"
                        />

                        <div>
                            <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                                Password reset successfully
                            </p>

                            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                                Redirecting you to login...
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            New password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-12 text-sm text-zinc-950 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            >
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Confirm password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                required
                                className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-12 text-sm text-zinc-950 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
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
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />
                                Resetting password...
                            </>
                        ) : (
                            "Reset password"
                        )}
                    </button>
                </form>
            )}
        </AuthLayout>
    );
}

export default ResetPassword;