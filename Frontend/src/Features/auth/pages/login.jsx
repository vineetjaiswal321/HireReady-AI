import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {

  const {loading, handleLogin}=useAuth()
  const navigate=useNavigate()
  
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
      } catch (error) {
          console.log(error);
          setError(
              error.response?.data?.message ||
              "Invalid email or password"
          );
      }
  };
  if(loading){
    return (<main><h1>Signing in......</h1></main>)
  }
  return (
    <div className="h-screen overflow-hidden bg-[#060816] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px]" />

      {/* Main container */}
      <div className="relative w-full max-w-6xl h-[calc(100vh-48px)] grid lg:grid-cols-2 bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-xl">

        {/* ================================================= */}
        {/* LEFT SECTION */}
        {/* ================================================= */}

        <div className="hidden lg:flex relative flex-col justify-between p-8 xl:p-10 overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-32 h-32 border border-violet-400/20 rounded-full" />
          <div className="absolute top-28 right-18 w-16 h-16 border border-violet-400/20 rounded-full" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
                >
                  <path
                    d="M12 3L14.2 9.8L21 12L14.2 14.2L12 21L9.8 14.2L3 12L9.8 9.8L12 3Z"
                    fill="white"
                  />
                </svg>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                HireReady<span className="text-violet-400">-AI</span>
              </span>

            </div>
          </div>

          {/* Main message */}
          <div className="relative z-10 max-w-lg">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              AI-powered career preparation
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.05] tracking-tight">
              Your next
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                interview.
              </span>

              <br />

              Your best
              <br />
              performance.
            </h1>

            <p className="mt-7 text-slate-400 text-lg leading-relaxed max-w-md">
              Practice realistic interviews, improve your answers and get
              intelligent AI feedback designed to help you land the job.
            </p>

            {/* AI stats */}
            <div className="mt-10 flex gap-8">

              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-slate-500 mt-1">
                  Interviews practiced
                </p>
              </div>

              <div className="w-px bg-white/10" />

              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-slate-500 mt-1">
                  User confidence
                </p>
              </div>

            </div>

          </div>

          {/* Bottom */}
          <p className="relative z-10 text-sm text-slate-600">
            © 2026 HireReady-AI. Prepare smarter. Perform better.
          </p>

        </div>

        {/* ================================================= */}
        {/* RIGHT SECTION */}
        {/* ================================================= */}

        <div className="bg-white text-slate-900 flex items-center justify-center p-5 sm:p-7 lg:p-9">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
                >
                  <path
                    d="M12 3L14.2 9.8L21 12L14.2 14.2L12 21L9.8 14.2L3 12L9.8 9.8L12 3Z"
                    fill="white"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold">
                HireReady<span className="text-violet-600">-AI</span>
              </span>

            </div>

            {/* Heading */}
            <div className="mb-8">

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="text-slate-500 mt-2">
                Sign in to continue your journey.
              </p>

            </div>

            {/* Google button */}
            <button
              type="button"
              className="w-full h-12 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 01-1.95 2.94v2.45h3.15c1.84-1.69 2.91-4.18 2.91-7.22z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.9c2.63 0 4.84-.87 6.45-2.35l-3.15-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.28v2.53A9.74 9.74 0 0012 21.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.54 13.99a5.86 5.86 0 010-3.98V7.48H3.28a9.75 9.75 0 000 9.04l3.26-2.53z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.98c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.05 14.63 2.1 12 2.1a9.74 9.74 0 00-8.72 5.38l3.26 2.53C7.31 7.7 9.46 5.98 12 5.98z"
                />
              </svg>

              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="h-px bg-slate-200 flex-1" />

              <span className="text-xs font-medium text-slate-400">
                OR CONTINUE WITH EMAIL
              </span>

              <div className="h-px bg-slate-200 flex-1" />

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>
                  </div>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="mb-4">

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />
                      <path d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-400">
                        {error}
                    </p>
                )}
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2 mb-7">

                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-violet-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-500 cursor-pointer"
                >
                  Remember me
                </label>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Sign in

                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>

              </button>

            </form>

            {/* Register */}
            <p className="text-center text-sm text-slate-500 mt-7">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-violet-600 hover:text-violet-700"
              >
                Create an account
              </Link>

            </p>

            {/* Security */}
            <div className="flex justify-center items-center gap-2 mt-8 text-xs text-slate-400">

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>

              Secure authentication

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;