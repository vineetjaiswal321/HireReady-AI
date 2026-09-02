import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Bell,
    Check,
    Loader2,
    Lock,
    Palette,
    Shield,
    Sparkles,
    User,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getSettings, updateSettings } from "../services/settings.api";
import { useTheme } from "../../context/themeContext";
import PageShell from "../../layout/PageShell.jsx";

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setTheme } = useTheme();

    const [activeSection, setActiveSection] = useState("account");
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const response = await getSettings();
                setSettings(response.data);

                if (response.data?.theme) {
                    setTheme(response.data.theme);
                }
            } catch (error) {
                // Silently handle fetch errors
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [setTheme]);

    if (loading || !settings) {
        return (
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                            Loading settings...
                        </p>
                    </div>
                </div>
            </PageShell>
        );
    }

    const updateSetting = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
        setSaved(false);
    };

    const handleThemeChange = async (value) => {
        setTheme(value);

        setSettings((prev) => ({
            ...prev,
            theme: value,
        }));

        setSaved(false);

        try {
            await updateSettings({ theme: value });
            setSaved(true);
        } catch (error) {
            // Silently handle theme update errors
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setSaved(false);

            const response = await updateSettings(settings);
            setSettings(response.data);
            setSaved(true);

            await new Promise((resolve) => setTimeout(resolve, 700));
        } catch (error) {
            // Silently handle settings update errors
        } finally {
            setSaving(false);
        }
    };

    const sections = [
        { id: "account", label: "Account", icon: User },
        { id: "ai", label: "AI Preferences", icon: Sparkles },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy", icon: Shield },
        { id: "security", label: "Security", icon: Lock },
        { id: "appearance", label: "Appearance", icon: Palette },
    ];

    return (
        <PageShell>
            <main className="relative mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
                <header className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                        <ArrowLeft size={15} />
                        Back
                    </button>

                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                        <span className="text-xs font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                            ACCOUNT SETTINGS
                        </span>
                    </div>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                        Settings
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        Manage your account and personalize your HireReady AI experience.
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className="h-fit lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                            <div className="px-3 pb-2 pt-3">
                                <p className="text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
                                    PREFERENCES
                                </p>
                            </div>

                            {sections.map((section) => {
                                const Icon = section.icon;
                                const active = activeSection === section.id;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition ${
                                            active
                                                ? "border border-violet-600 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-300"
                                                : "border border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                                active
                                                    ? "bg-violet-600 text-white"
                                                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                                            }`}
                                        >
                                            <Icon size={15} />
                                        </span>
                                        {section.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-base font-bold text-white">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-400">
                                        {user?.email || ""}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
                                <p className="text-[11px] font-medium text-zinc-500">Signed in</p>
                                <p className="mt-0.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Your HireReady AI account
                                </p>
                            </div>
                        </div>
                    </aside>

                    <div className="min-w-0 space-y-5">
                        {activeSection === "account" && (
                            <SettingsCard
                                eyebrow="Account"
                                title="Account information"
                                description="Manage your basic account and professional profile."
                            >
                                <SettingRow title="Full Name" description="Your display name">
                                    <ValueText>{user?.name || "Not provided"}</ValueText>
                                </SettingRow>

                                <SettingRow
                                    title="Email Address"
                                    description="Your registered email address"
                                >
                                    <ValueText>{user?.email || "Not provided"}</ValueText>
                                </SettingRow>

                                <SettingRow
                                    title="Profile"
                                    description="View your complete professional profile"
                                >
                                    <SecondaryButton onClick={() => navigate("/profile")}>
                                        View Profile
                                    </SecondaryButton>
                                </SettingRow>

                                <SettingRow
                                    title="Edit Profile"
                                    description="Update skills, projects, experience and social links"
                                >
                                    <PrimarySoftButton onClick={() => navigate("/update-profile")}>
                                        Edit Profile
                                    </PrimarySoftButton>
                                </SettingRow>
                            </SettingsCard>
                        )}

                        {activeSection === "ai" && (
                            <SettingsCard
                                eyebrow="Intelligence"
                                title="AI Preferences"
                                description="Control how HireReady AI prepares, interviews and evaluates you."
                            >
                                <ToggleSetting
                                    title="AI Suggestions"
                                    description="Receive personalized suggestions to improve your interview readiness."
                                    checked={settings.aiSuggestions}
                                    onChange={(value) => updateSetting("aiSuggestions", value)}
                                />
                                <ToggleSetting
                                    title="Personalized Preparation"
                                    description="Generate preparation plans based on your profile and target roles."
                                    checked={settings.personalizedPreparation}
                                    onChange={(value) => updateSetting("personalizedPreparation", value)}
                                />
                                <ToggleSetting
                                    title="Adaptive Difficulty"
                                    description="Automatically adjust interview difficulty based on your performance."
                                    checked={settings.adaptiveDifficulty}
                                    onChange={(value) => updateSetting("adaptiveDifficulty", value)}
                                />
                                <ToggleSetting
                                    title="Follow-up Questions"
                                    description="Allow AI to ask contextual follow-up questions during interviews."
                                    checked={settings.followUpQuestions}
                                    onChange={(value) => updateSetting("followUpQuestions", value)}
                                />
                                <ToggleSetting
                                    title="Show Hints"
                                    description="Provide hints when you get stuck during practice."
                                    checked={settings.showHints}
                                    onChange={(value) => updateSetting("showHints", value)}
                                />
                                <ToggleSetting
                                    title="Detailed Feedback"
                                    description="Receive detailed explanations and actionable improvement suggestions."
                                    checked={settings.detailedFeedback}
                                    onChange={(value) => updateSetting("detailedFeedback", value)}
                                />
                            </SettingsCard>
                        )}

                        {activeSection === "notifications" && (
                            <SettingsCard
                                eyebrow="Updates"
                                title="Notifications"
                                description="Choose which HireReady AI updates and reminders you receive."
                            >
                                <ToggleSetting
                                    title="Interview Reminders"
                                    description="Get reminded about upcoming interviews and practice sessions."
                                    checked={settings.interviewReminders}
                                    onChange={(value) => updateSetting("interviewReminders", value)}
                                />
                                <ToggleSetting
                                    title="Preparation Reminders"
                                    description="Receive reminders to continue your preparation plan."
                                    checked={settings.preparationReminders}
                                    onChange={(value) => updateSetting("preparationReminders", value)}
                                />
                                <ToggleSetting
                                    title="Job Recommendations"
                                    description="Receive relevant job recommendations based on your profile."
                                    checked={settings.jobRecommendations}
                                    onChange={(value) => updateSetting("jobRecommendations", value)}
                                />
                                <ToggleSetting
                                    title="Profile Suggestions"
                                    description="Get suggestions when your professional profile can be improved."
                                    checked={settings.profileSuggestions}
                                    onChange={(value) => updateSetting("profileSuggestions", value)}
                                />
                            </SettingsCard>
                        )}

                        {activeSection === "privacy" && (
                            <SettingsCard
                                eyebrow="Privacy"
                                title="Profile privacy"
                                description="Control which professional information is visible to others."
                            >
                                <SelectSetting
                                    title="Profile Visibility"
                                    description="Choose who can view your HireReady AI profile."
                                    value={settings.profileVisibility}
                                    options={["Public", "Private"]}
                                    onChange={(value) => updateSetting("profileVisibility", value)}
                                />
                                <ToggleSetting
                                    title="Show Social Links"
                                    description="Display GitHub, LinkedIn and portfolio links on your profile."
                                    checked={settings.showSocialLinks}
                                    onChange={(value) => updateSetting("showSocialLinks", value)}
                                />
                                <ToggleSetting
                                    title="Show Coding Profiles"
                                    description="Display LeetCode, GFG, CodeChef and other coding profiles."
                                    checked={settings.showCodingProfiles}
                                    onChange={(value) => updateSetting("showCodingProfiles", value)}
                                />
                            </SettingsCard>
                        )}

                        {activeSection === "security" && (
                            <SettingsCard
                                eyebrow="Protection"
                                title="Security"
                                description="Keep your HireReady AI account and sessions secure."
                            >
                                <SettingRow title="Password" description="Change your account password">
                                    <SecondaryButton>Change Password</SecondaryButton>
                                </SettingRow>

                                <SettingRow
                                    title="Active Sessions"
                                    description="Manage devices currently signed into your account."
                                >
                                    <SecondaryButton>Manage Sessions</SecondaryButton>
                                </SettingRow>

                                <div className="m-6 rounded-2xl border border-red-200 bg-red-50/70 p-5 dark:border-red-500/20 dark:bg-red-500/[0.06]">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                            !
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-700 dark:text-red-400">
                                                Danger Zone
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-red-600/80 dark:text-zinc-400">
                                                Permanently delete your HireReady AI account and associated data.
                                            </p>
                                            <button className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-500/10">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SettingsCard>
                        )}

                        {activeSection === "appearance" && (
                            <SettingsCard
                                eyebrow="Interface"
                                title="Appearance"
                                description="Choose how HireReady AI looks across your workspace."
                            >
                                <div className="p-6 sm:p-7">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                                                Theme
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                                Select a theme for your HireReady AI workspace.
                                            </p>
                                        </div>

                                        <span className="hidden rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 sm:inline-flex dark:bg-white/[0.05] dark:text-zinc-400">
                                            {settings.theme}
                                        </span>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        {[
                                            {
                                                value: "Dark",
                                                title: "Dark",
                                                description: "Focused and easy on the eyes",
                                            },
                                            {
                                                value: "Light",
                                                title: "Light",
                                                description: "Clean and bright workspace",
                                            },
                                            {
                                                value: "System",
                                                title: "System",
                                                description: "Follow your device preference",
                                            },
                                        ].map((item) => (
                                            <ThemeOption
                                                key={item.value}
                                                {...item}
                                                selected={settings.theme === item.value}
                                                onClick={() => handleThemeChange(item.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SettingsCard>
                        )}

                        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                                        saved
                                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                            : "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                                    }`}
                                >
                                    {saved ? <Check size={16} /> : "•"}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                        {saved ? "Changes saved" : "Unsaved changes"}
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        {saved
                                            ? "Your preferences are up to date."
                                            : "Save your preferences when you're ready."}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="inline-flex min-w-[150px] items-center justify-center rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </PageShell>
    );
};

const SettingsCard = ({ eyebrow, title, description, children }) => (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
        <div className="border-b border-zinc-200 bg-zinc-50/80 px-6 py-6 sm:px-7 dark:border-white/10 dark:bg-zinc-950/40">
            {eyebrow && (
                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                    {eyebrow.toUpperCase()}
                </p>
            )}
            <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                {title}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
        </div>
        <div>{children}</div>
    </section>
);

const SettingRow = ({ title, description, children }) => (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-white/10">
        <div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</p>
            <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        <div className="shrink-0">{children}</div>
    </div>
);

const ValueText = ({ children }) => (
    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{children}</p>
);

const SecondaryButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
        {children}
    </button>
);

const PrimarySoftButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/15"
    >
        {children}
    </button>
);

const ToggleSetting = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-5 border-b border-zinc-200 px-6 py-5 last:border-0 sm:px-7 dark:border-white/10">
        <div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</p>
            <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
        </div>

        <button
            type="button"
            onClick={() => onChange(!checked)}
            aria-pressed={checked}
            className={`relative h-6 w-11 shrink-0 rounded-full p-0.5 transition ${
                checked ? "bg-violet-600" : "bg-zinc-300 dark:bg-white/[0.12]"
            }`}
        >
            <span
                className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    checked ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    </div>
);

const SelectSetting = ({ title, description, value, options, onChange }) => (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-white/10">
        <div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</p>
            <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
        </div>

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 sm:w-44 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300"
        >
            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                    className="bg-white text-zinc-900 dark:bg-[#111113] dark:text-white"
                >
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const ThemeOption = ({ value, title, description, selected, onClick }) => {
    const isDark = value === "Dark";
    const isLight = value === "Light";
    const isSystem = value === "System";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition ${
                selected
                    ? "border-violet-600 bg-violet-50 ring-2 ring-violet-500/15 dark:border-violet-500/50 dark:bg-violet-500/[0.08]"
                    : "border-zinc-200 bg-zinc-50/60 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-white/20"
            }`}
        >
            {selected && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                    <Check size={12} />
                </span>
            )}

            <div
                className={`h-28 overflow-hidden rounded-xl border ${
                    isDark
                        ? "border-zinc-700 bg-[#111113]"
                        : isLight
                          ? "border-zinc-200 bg-white"
                          : "border-zinc-300 bg-gradient-to-br from-zinc-100 via-white to-zinc-800"
                }`}
            >
                {isSystem ? (
                    <div className="grid h-full grid-cols-2">
                        <div className="bg-white p-2">
                            <div className="h-2 w-10 rounded bg-zinc-200" />
                            <div className="mt-3 h-12 rounded-lg border border-zinc-200 bg-zinc-50" />
                        </div>
                        <div className="bg-[#111113] p-2">
                            <div className="h-2 w-10 rounded bg-zinc-700" />
                            <div className="mt-3 h-12 rounded-lg border border-zinc-700 bg-zinc-900" />
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-2">
                        <div className={`h-2 w-12 rounded ${isDark ? "bg-violet-400/70" : "bg-violet-500"}`} />
                        <div className="mt-3 grid grid-cols-[34%_1fr] gap-2">
                            <div className={`h-16 rounded-lg ${isDark ? "bg-zinc-900" : "bg-zinc-50"}`} />
                            <div
                                className={`h-16 rounded-lg border ${
                                    isDark
                                        ? "border-zinc-700 bg-zinc-950"
                                        : "border-zinc-200 bg-white shadow-sm"
                                }`}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="px-1 pb-1 pt-4">
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>
        </button>
    );
};

export default Settings;
