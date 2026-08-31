import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



function Register() {
  const navigate=useNavigate()

  const [username, setUsername]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const {loading, handleRegister}=useAuth()

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  await handleRegister({
      username,
      email,
      password,
    });

    navigate("/");
  };

  if(loading){
    return (<main><h1>Registering.....</h1></main>)
  }



  return (
    <div className="h-screen overflow-hidden bg-[#060816] text-white flex items-center justify-center p-3 sm:p-4 relative">

      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px]" />

      {/* Main Card */}
      <div className="relative w-full max-w-6xl h-[calc(100vh-32px)] max-h-[760px] grid lg:grid-cols-2 bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-xl">

        {/* ================================================= */}
        {/* LEFT SIDE */}
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
                HireReady
                <span className="text-violet-400">-AI</span>
              </span>

            </div>

          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-lg">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-sm mb-6">

              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />

              AI-powered career preparation

            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.05] tracking-tight">

              Build your
              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                interview edge.
              </span>

            </h1>

            <p className="mt-6 text-slate-400 text-base xl:text-lg leading-relaxed max-w-md">

              Create your account and start practicing smarter with
              personalized AI-powered interview preparation.

            </p>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center">

                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>

                </div>

                <span className="text-sm text-slate-300">
                  AI-powered mock interviews
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center">

                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-6" />
                  </svg>

                </div>

                <span className="text-sm text-slate-300">
                  Personalized performance insights
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center">

                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
                  </svg>

                </div>

                <span className="text-sm text-slate-300">
                  Track your interview progress
                </span>

              </div>

            </div>

          </div>

          <p className="relative z-10 text-sm text-slate-600">
            © 2026 HireReady-AI. Prepare smarter. Perform better.
          </p>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="bg-white text-slate-900 flex items-center justify-center p-5 sm:p-7 lg:p-9 overflow-hidden">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="lg:hidden flex items-center gap-3 mb-7">

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
                HireReady
                <span className="text-violet-600">-AI</span>
              </span>

            </div>

            {/* Heading */}

            <div className="mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Create your account
              </h2>

              <p className="text-slate-500 mt-2 text-sm">
                Start your journey towards better interviews.
              </p>

            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>

              {/* Username */}

              <div className="mb-4">

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Username
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
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
                    </svg>

                  </div>

                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    required
                    className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="mb-4">

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
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
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    className="w-full h-11 pl-12 pr-4 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-4">

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password
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
                    name="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                    minLength={8}
                    className="w-full h-11 pl-12 pr-16 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm password
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
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full h-11 pl-12 pr-16 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* Terms */}

              <div className="flex items-start gap-2 mb-5">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 accent-violet-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs text-slate-500 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <span className="text-violet-600 font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-violet-600 font-medium">
                    Privacy Policy
                  </span>
                  .
                </label>

              </div>

              {/* Register Button */}

              <button
                type="submit"
                className="group w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Create account

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

            {/* Login */}

            <p className="text-center text-sm text-slate-500 mt-5">

              Already have an account?{" "}

              <Link
                to={"/login"}
                className="font-semibold text-violet-600 hover:text-violet-700"
              >
                Sign in
              </Link>

            </p>

            {/* Security */}

            <div className="flex justify-center items-center gap-2 mt-5 text-xs text-slate-400">

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

              Your data is securely protected

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;