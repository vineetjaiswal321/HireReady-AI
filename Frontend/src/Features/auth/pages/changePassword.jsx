import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    CircleCheck,
    X,
} from "lucide-react";
import AuthLayout from "../../layout/AuthLayout.jsx";
import { changePassword } from "../services/auth.api.js";

const PasswordInput = ({
    label,
    value,
    onChange,
    show,
    setShow,
    placeholder,
    autoComplete,
}) => (
    <div>
        <label className="mb-1.5 block text-[13px] font-medium text-slate-700 dark:text-slate-300">
            {label}
        </label>

        <div className="relative">
            <LockKeyhole
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-600 dark:placeholder:text-slate-500"
            />

            <button
                type="button"
                aria-label={show ? `Hide ${label}` : `Show ${label}`}
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
    </div>
);

const Requirement = ({ valid, children }) => (
    <div className="flex items-center gap-1.5">
        {valid ? (
            <CircleCheck size={13} className="text-emerald-500" />
        ) : (
            <X size={13} className="text-slate-300 dark:text-slate-600" />
        )}

        <span
            className={`text-[11px] ${
                valid
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
            }`}
        >
            {children}
        </span>
    </div>
);

const ChangePassword = () => {
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const passwordRequirements = useMemo(
        () => ({
            length: newPassword.length >= 6,
            match:
                newPassword.length > 0 &&
                confirmPassword.length > 0 &&
                newPassword === confirmPassword,
            different:
                newPassword.length > 0 &&
                currentPassword.length > 0 &&
                newPassword !== currentPassword,
        }),
        [newPassword, confirmPassword, currentPassword]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Your new password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("The new passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError(
                "Your new password must be different from your current password."
            );
            return;
        }

        try {
            setLoading(true);

            await changePassword({
                currentPassword,
                newPassword,
            });

            setSuccess(true);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Unable to change your password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            heading="Your account, always protected."
            subheading="Keep your HireReady AI profile, interview history, and prep progress safe with a strong, up-to-date password."
            highlights={[
                "Bank-grade encryption on every update",
                "Instant sign-out from other devices",
                "24/7 monitoring for suspicious activity",
            ]}
        >
            <div className="flex h-full max-h-screen w-full items-center justify-center overflow-hidden px-4 py-3 sm:px-6">
                <div className="w-full max-w-[420px]">
                    {/* Back */}
                    <Link
                        to="/settings"
                        className="mb-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                    >
                        <ArrowLeft size={14} />
                        Back to Settings
                    </Link>

                    {/* Card */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-8px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900">
                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-violet-50 via-white to-white px-5 py-4 dark:border-slate-800 dark:from-violet-500/10 dark:via-slate-900 dark:to-slate-900">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-600/30">
                                            <ShieldCheck size={19} />
                                        </div>

                                        <div>
                                            <h1 className="text-base font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                                                Change Password
                                            </h1>

                                            <p className="mt-0.5 text-[12px] leading-tight text-slate-500 dark:text-slate-400">
                                                Keep your account secure with a strong password.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="px-5 py-4">
                                    {error && (
                                        <div
                                            role="alert"
                                            className="mb-3 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-400"
                                        >
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <PasswordInput
                                            label="Current Password"
                                            value={currentPassword}
                                            onChange={setCurrentPassword}
                                            show={showCurrent}
                                            setShow={setShowCurrent}
                                            placeholder="Enter your current password"
                                            autoComplete="current-password"
                                        />

                                        <div>
                                            <PasswordInput
                                                label="New Password"
                                                value={newPassword}
                                                onChange={setNewPassword}
                                                show={showNew}
                                                setShow={setShowNew}
                                                placeholder="Enter your new password"
                                                autoComplete="new-password"
                                            />

                                            {newPassword && (
                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
                                                    <Requirement valid={passwordRequirements.length}>
                                                        At least 6 characters
                                                    </Requirement>

                                                    <Requirement valid={passwordRequirements.different}>
                                                        Different from current
                                                    </Requirement>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <PasswordInput
                                                label="Confirm New Password"
                                                value={confirmPassword}
                                                onChange={setConfirmPassword}
                                                show={showConfirm}
                                                setShow={setShowConfirm}
                                                placeholder="Re-enter your new password"
                                                autoComplete="new-password"
                                            />

                                            {confirmPassword && (
                                                <div className="mt-1.5 px-0.5">
                                                    <Requirement valid={passwordRequirements.match}>
                                                        Passwords match
                                                    </Requirement>
                                                </div>
                                            )}
                                        </div>

                                        {/* Security message */}
                                        <div className="flex items-center gap-2.5 rounded-lg border border-violet-100 bg-violet-50/70 px-3 py-2 dark:border-violet-500/10 dark:bg-violet-500/5">
                                            <ShieldCheck
                                                size={14}
                                                className="shrink-0 text-violet-600 dark:text-violet-400"
                                            />

                                            <p className="text-[10.5px] leading-4 text-violet-700 dark:text-violet-300">
                                                Use a unique password and never share it with anyone.
                                            </p>
                                        </div>

                                        {/* Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex h-10.5 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-all duration-200 hover:bg-violet-700 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                    Updating Password...
                                                </>
                                            ) : (
                                                <>
                                                    <LockKeyhole size={16} />
                                                    Update Password
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            /* Success */
                            <div className="px-5 py-10 text-center">
                                <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/10">
                                    <CheckCircle2 size={28} />
                                </div>

                                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Password Updated
                                </h1>

                                <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-5 text-slate-500 dark:text-slate-400">
                                    Your password has been changed successfully.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/settings")}
                                    className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700"
                                >
                                    Back to Settings
                                </button>
                            </div>
                        )}
                    </div>

                    {!success && (
                        <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500">
                            Your password is securely encrypted before being stored.
                        </p>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
};

export default ChangePassword;