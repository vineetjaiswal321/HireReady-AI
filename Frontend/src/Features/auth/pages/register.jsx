import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../../layout/AuthLayout.jsx";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { loading, handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        await handleRegister({
            username,
            email,
            password,
        });

        navigate("/");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F7F8] dark:bg-[#09090B]">
                <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                        Creating your account...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthLayout
            heading={
                <>
                    Build your
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        interview edge.
                    </span>
                </>
            }
            subheading="Create your account and start practicing smarter with personalized AI-powered interview preparation."
            highlights={[
                "AI-powered mock interviews",
                "Personalized performance insights",
                "Track your interview progress",
            ]}
        >
            <div className="mb-6 lg:hidden">
                <p className="text-lg font-semibold tracking-tight">
                    HireReady<span className="text-violet-600 dark:text-violet-400">AI</span>
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Start your journey towards better interviews.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Username
                    </label>
                    <div className="relative">
                        <User
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Email address
                    </label>
                    <div className="relative">
                        <Mail
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Password
                    </label>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Confirm password
                    </label>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-12 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {error && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}
                </div>

                <label className="flex items-start gap-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    <input
                        id="terms"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 accent-violet-600"
                    />
                    <span>
                        I agree to the{" "}
                        <span className="font-medium text-violet-600 dark:text-violet-400">
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="font-medium text-violet-600 dark:text-violet-400">
                            Privacy Policy
                        </span>
                        .
                    </span>
                </label>

                <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
                >
                    Create account
                </button>
            </form>

            <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Already have an account?{" "}
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

export default Register;
