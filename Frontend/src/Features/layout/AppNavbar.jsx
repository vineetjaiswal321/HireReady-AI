import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronDown,
    FileText,
    LogOut,
    Moon,
    Settings,
    Sparkles,
    Sun,
    User,
} from "lucide-react";
import { AuthContext } from "../auth/auth.context.jsx";
import { useTheme } from "../context/themeContext.jsx";

const AppNavbar = ({ variant = "app" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout, user } = useContext(AuthContext);
    const { theme, setTheme } = useTheme();

    const isDark =
        theme === "Dark" ||
        (theme === "System" &&
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

    const toggleTheme = () => {
        setTheme(isDark ? "Light" : "Dark");
    };

    useEffect(() => {
        const handleClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const homeLinks = [
        { href: "#builder", label: "Interview Builder" },
        { href: "#how-it-works", label: "How it works" },
        { href: "#features", label: "Features" },
    ];

    const appLinks = [
        { href: "/", label: "Interview Builder" },
        { href: "/reports", label: "Reports" },
        { href: "/profile", label: "Profile" },
    ];

    const links = variant === "home" ? homeLinks : appLinks;

    const isActive = (href) => {
        if (href.startsWith("#")) return false;
        return location.pathname === href;
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#09090B]/90">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2.5"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                        <Sparkles size={16} />
                    </div>
                    <span className="font-semibold tracking-tight text-zinc-950 dark:text-white">
                        HireReady
                        <span className="text-violet-600 dark:text-violet-400">AI</span>
                    </span>
                </button>

                <div className="hidden items-center gap-7 md:flex">
                    {links.map((link) =>
                        link.href.startsWith("#") ? (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <button
                                key={link.label}
                                type="button"
                                onClick={() => navigate(link.href)}
                                className={`text-sm font-medium transition ${
                                    isActive(link.href)
                                        ? "text-zinc-950 dark:text-white"
                                        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                                }`}
                            >
                                {link.label}
                            </button>
                        )
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white">
                                <User size={18} />
                            </div>
                            <ChevronDown
                                size={15}
                                className={`text-zinc-500 transition-transform ${
                                    profileOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                                <div className="border-b border-zinc-200 p-4 dark:border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                                            <User size={19} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                                                {user?.username || user?.name || "User"}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">
                                                {user?.email || "No email"}
                                            </p>
                                            <p className="mt-2 text-xs text-zinc-500">
                                                Manage your account
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                    >
                                        <User size={17} className="text-zinc-500" />
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/reports");
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                    >
                                        <FileText size={17} className="text-zinc-500" />
                                        Recent Reports
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/settings");
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                    >
                                        <Settings size={17} className="text-zinc-500" />
                                        Settings
                                    </button>
                                </div>

                                <div className="border-t border-zinc-200 p-2 dark:border-white/10">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;
