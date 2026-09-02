import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout.jsx";

function Login() {
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await handleLogin({ email, password });

            if (success) {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F7F8] dark:bg-[#09090B]">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                        Signing you in...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthLayout
            heading={
                <>
                    Your next
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        interview.
                    </span>
                    <br />
                    Your best performance.
                </>
            }
            subheading="Practice realistic interviews, improve your answers, and get intelligent AI feedback designed to help you land the job."
            highlights={[
                "AI-powered mock interviews",
                "Personalized performance insights",
                "Track your interview progress",
            ]}
        >
            <div className="mb-8 lg:hidden">
                <p className="text-lg font-semibold tracking-tight">
                    HireReady<span className="text-violet-600 dark:text-violet-400">AI</span>
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Sign in to continue your interview preparation.
                </p>
            </div>

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

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Password
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {error && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                </div>

                <label className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 accent-violet-600"
                    />
                    Remember me
                </label>

                <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-7 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
                >
                    Create an account
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;
