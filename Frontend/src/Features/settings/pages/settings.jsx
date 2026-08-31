import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { getSettings, updateSettings } from "../services/settings.api";


const Settings = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

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
            } catch (error) {
                console.error(
                    "Failed to fetch settings:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="w-10 h-10
                        border-2
                        border-purple-500/20
                        border-t-purple-500
                        rounded-full
                        animate-spin
                        mx-auto"
                    />

                    <p className="text-sm text-gray-500 mt-4">
                        Loading settings...
                    </p>

                </div>

            </div>
        );
    }

    const updateSetting = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));

        setSaved(false);
    };


    const handleSave = async () => {
        try {
            setSaving(true);
            setSaved(false);

            const response = await updateSettings(settings);

            setSettings(response.data);
            setSaved(true);

            // Keep "Saving..." visible for at least 1.5 seconds
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error(
                "Failed to update settings:",
                error
            );
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#08090d] text-white">

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="absolute top-[-200px] left-[15%]
                    w-[500px] h-[500px]
                    rounded-full
                    bg-purple-600/10
                    blur-[150px]"
                />

                <div
                    className="absolute bottom-[-250px] right-[5%]
                    w-[500px] h-[500px]
                    rounded-full
                    bg-violet-600/10
                    blur-[150px]"
                />

            </div>


            <main className="relative max-w-7xl mx-auto px-5 md:px-8 py-8">


                {/* Header */}
                <div className="mb-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-500
                        hover:text-white transition mb-4"
                    >
                        ← Back
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account and personalize
                        your HireReady AI experience.
                    </p>

                </div>


                {/* Main Layout */}
                <div className="grid lg:grid-cols-[240px_1fr] gap-6">


                    {/* SIDEBAR */}
                    <aside className="lg:sticky lg:top-6 h-fit">

                        <div
                            className="rounded-2xl
                            border border-white/[0.07]
                            bg-[#0e1017]
                            p-3"
                        >

                            <SettingsButton
                                icon="◎"
                                label="Account"
                                active={activeSection === "account"}
                                onClick={() =>
                                    setActiveSection("account")
                                }
                            />

                            <SettingsButton
                                icon="✦"
                                label="AI Preferences"
                                active={activeSection === "ai"}
                                onClick={() =>
                                    setActiveSection("ai")
                                }
                            />

                            <SettingsButton
                                icon="♢"
                                label="Notifications"
                                active={activeSection === "notifications"}
                                onClick={() =>
                                    setActiveSection("notifications")
                                }
                            />

                            <SettingsButton
                                icon="◉"
                                label="Privacy"
                                active={activeSection === "privacy"}
                                onClick={() =>
                                    setActiveSection("privacy")
                                }
                            />

                            <SettingsButton
                                icon="⌘"
                                label="Security"
                                active={activeSection === "security"}
                                onClick={() =>
                                    setActiveSection("security")
                                }
                            />

                            <SettingsButton
                                icon="◐"
                                label="Appearance"
                                active={activeSection === "appearance"}
                                onClick={() =>
                                    setActiveSection("appearance")
                                }
                            />

                        </div>


                        {/* User Mini Card */}
                        <div
                            className="mt-4 rounded-2xl
                            border border-white/[0.07]
                            bg-[#0e1017]
                            p-5"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="w-11 h-11
                                    rounded-full
                                    bg-gradient-to-br
                                    from-violet-600
                                    to-purple-500
                                    flex items-center
                                    justify-center
                                    font-semibold"
                                >
                                    {user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                                <div className="min-w-0">

                                    <p className="font-medium truncate">
                                        {user?.name || "User"}
                                    </p>

                                    <p className="text-xs text-gray-600 truncate">
                                        {user?.email || ""}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </aside>


                    {/* CONTENT */}
                    <div className="space-y-6">


                        {/* ACCOUNT */}
                        {activeSection === "account" && (

                            <SettingsCard
                                title="Account"
                                description="Manage your HireReady AI account information."
                            >

                                <SettingRow
                                    title="Full Name"
                                    description="Your display name"
                                >

                                    <p className="text-sm text-gray-300">
                                        {user?.name || "Not provided"}
                                    </p>

                                </SettingRow>


                                <SettingRow
                                    title="Email Address"
                                    description="Your registered email address"
                                >

                                    <p className="text-sm text-gray-300">
                                        {user?.email || "Not provided"}
                                    </p>

                                </SettingRow>


                                <SettingRow
                                    title="Profile"
                                    description="Manage your professional information"
                                >

                                    <button
                                        onClick={() =>
                                            navigate("/profile")
                                        }
                                        className="px-4 py-2
                                        rounded-lg
                                        bg-purple-500/10
                                        border border-purple-500/20
                                        text-purple-400
                                        text-sm
                                        hover:bg-purple-500/20
                                        transition"
                                    >
                                        View Profile
                                    </button>

                                </SettingRow>


                                <SettingRow
                                    title="Edit Profile"
                                    description="Update skills, projects, experience and links"
                                >

                                    <button
                                        onClick={() =>
                                            navigate("/update-profile")
                                        }
                                        className="px-4 py-2
                                        rounded-lg
                                        bg-white/[0.04]
                                        border border-white/[0.08]
                                        text-gray-300
                                        text-sm
                                        hover:text-white
                                        hover:bg-white/[0.07]
                                        transition"
                                    >
                                        Edit Profile
                                    </button>

                                </SettingRow>

                            </SettingsCard>

                        )}


                        {/* AI PREFERENCES */}
                        {activeSection === "ai" && (

                            <SettingsCard
                                title="AI Preferences"
                                description="Customize how HireReady AI prepares and evaluates you."
                            >

                                <ToggleSetting
                                    title="AI Suggestions"
                                    description="Receive personalized suggestions to improve your interview readiness."
                                    checked={settings.aiSuggestions}
                                    onChange={(value) =>
                                        updateSetting(
                                            "aiSuggestions",
                                            value
                                        )
                                    }
                                />
                                <ToggleSetting
                                    title="Personalized Preparation"
                                    description="Allow HireReady AI to generate preparation plans based on your profile."
                                    checked={settings.personalizedPreparation}
                                    onChange={(value) =>
                                        updateSetting(
                                            "personalizedPreparation",
                                            value
                                        )
                                    }
                                />

                                <ToggleSetting
                                    title="Adaptive Difficulty"
                                    description="Let AI automatically adjust interview difficulty based on your experience and performance."
                                    checked={settings.adaptiveDifficulty}
                                    onChange={(value) =>
                                        updateSetting(
                                            "adaptiveDifficulty",
                                            value
                                        )
                                    }
                                />

                                <ToggleSetting
                                    title="Follow-up Questions"
                                    description="Allow AI to ask contextual follow-up questions during interviews."
                                    checked={settings.followUpQuestions}
                                    onChange={(value) =>
                                        updateSetting(
                                            "followUpQuestions",
                                            value
                                        )
                                    }
                                />

                                <ToggleSetting
                                    title="Show Hints"
                                    description="Allow HireReady AI to provide hints when you get stuck during practice."
                                    checked={settings.showHints}
                                    onChange={(value) =>
                                        updateSetting(
                                            "showHints",
                                            value
                                        )
                                    }
                                />

                                <ToggleSetting
                                    title="Detailed Feedback"
                                    description="Receive detailed explanations and improvement suggestions after interviews."
                                    checked={settings.detailedFeedback}
                                    onChange={(value) =>
                                        updateSetting(
                                            "detailedFeedback",
                                            value
                                        )
                                    }
                                />

                            </SettingsCard>

                        )}


                        {/* NOTIFICATIONS */}
                        {activeSection === "notifications" && (

                            <SettingsCard
                                title="Notifications"
                                description="Choose what HireReady AI should notify you about."
                            >

                                <ToggleSetting
                                    title="Interview Reminders"
                                    description="Get reminded about upcoming interviews and practice sessions."
                                    checked={settings.interviewReminders}
                                    onChange={(value) =>
                                        updateSetting(
                                            "interviewReminders",
                                            value
                                        )
                                    }
                                />


                                <ToggleSetting
                                    title="Preparation Reminders"
                                    description="Receive reminders to continue your preparation plan."
                                    checked={settings.preparationReminders}
                                    onChange={(value) =>
                                        updateSetting(
                                            "preparationReminders",
                                            value
                                        )
                                    }
                                />


                                <ToggleSetting
                                    title="Job Recommendations"
                                    description="Receive job recommendations based on your profile."
                                    checked={settings.jobRecommendations}
                                    onChange={(value) =>
                                        updateSetting(
                                            "jobRecommendations",
                                            value
                                        )
                                    }
                                />


                                <ToggleSetting
                                    title="Profile Suggestions"
                                    description="Get suggestions when your profile can be improved."
                                    checked={settings.profileSuggestions}
                                    onChange={(value) =>
                                        updateSetting(
                                            "profileSuggestions",
                                            value
                                        )
                                    }
                                />

                            </SettingsCard>

                        )}


                        {/* PRIVACY */}
                        {activeSection === "privacy" && (

                            <SettingsCard
                                title="Privacy"
                                description="Control what information is visible on your profile."
                            >

                                <SelectSetting
                                    title="Profile Visibility"
                                    description="Choose who can view your HireReady AI profile."
                                    value={settings.profileVisibility}
                                    options={[
                                        "Public",
                                        "Private",
                                    ]}
                                    onChange={(value) =>
                                        updateSetting(
                                            "profileVisibility",
                                            value
                                        )
                                    }
                                />


                                <ToggleSetting
                                    title="Show Social Links"
                                    description="Display GitHub, LinkedIn and portfolio links on your profile."
                                    checked={settings.showSocialLinks}
                                    onChange={(value) =>
                                        updateSetting(
                                            "showSocialLinks",
                                            value
                                        )
                                    }
                                />


                                <ToggleSetting
                                    title="Show Coding Profiles"
                                    description="Display your LeetCode, GFG, CodeChef and other coding profiles."
                                    checked={settings.showCodingProfiles}
                                    onChange={(value) =>
                                        updateSetting(
                                            "showCodingProfiles",
                                            value
                                        )
                                    }
                                />

                            </SettingsCard>

                        )}


                        {/* SECURITY */}
                        {activeSection === "security" && (

                            <SettingsCard
                                title="Security"
                                description="Keep your HireReady AI account secure."
                            >

                                <SettingRow
                                    title="Password"
                                    description="Change your account password"
                                >

                                    <button
                                        className="px-4 py-2
                                        rounded-lg
                                        bg-white/[0.04]
                                        border border-white/[0.08]
                                        text-sm text-gray-300
                                        hover:text-white
                                        hover:bg-white/[0.07]
                                        transition"
                                    >
                                        Change Password
                                    </button>

                                </SettingRow>


                                <SettingRow
                                    title="Active Sessions"
                                    description="Manage devices currently signed into your account."
                                >

                                    <button
                                        className="px-4 py-2
                                        rounded-lg
                                        bg-white/[0.04]
                                        border border-white/[0.08]
                                        text-sm text-gray-300
                                        hover:text-white
                                        transition"
                                    >
                                        Manage Sessions
                                    </button>

                                </SettingRow>


                                {/* Danger Zone */}
                                <div className="mt-8
                                    rounded-xl
                                    border border-red-500/15
                                    bg-red-500/[0.03]
                                    p-5">

                                    <h3 className="font-medium text-red-400">
                                        Danger Zone
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-1">
                                        Permanently delete your HireReady AI
                                        account and associated data.
                                    </p>

                                    <button
                                        className="mt-4 px-4 py-2
                                        rounded-lg
                                        border border-red-500/20
                                        text-red-400
                                        text-sm
                                        hover:bg-red-500/10
                                        transition"
                                    >
                                        Delete Account
                                    </button>

                                </div>

                            </SettingsCard>

                        )}


                        {/* APPEARANCE */}
                        {activeSection === "appearance" && (

                            <SettingsCard
                                title="Appearance"
                                description="Customize the look and feel of HireReady AI."
                            >

                                <div>

                                    <p className="text-sm font-medium">
                                        Theme
                                    </p>

                                    <p className="text-xs text-gray-600 mt-1">
                                        Choose how HireReady AI appears.
                                    </p>


                                    <div className="grid sm:grid-cols-3 gap-3 mt-4">

                                        {["Dark", "Light", "System"].map(
                                            (theme) => (

                                                <button
                                                    key={theme}
                                                    onClick={() =>
                                                        updateSetting(
                                                            "theme",
                                                            theme
                                                        )
                                                    }
                                                    className={`p-4 rounded-xl
                                                    border text-left
                                                    transition ${
                                                        settings.theme === theme
                                                            ? "border-purple-500/40 bg-purple-500/10"
                                                            : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]"
                                                    }`}
                                                >

                                                    <div className="text-sm font-medium">
                                                        {theme}
                                                    </div>

                                                    <div className="text-xs text-gray-600 mt-1">
                                                        {theme === "Dark"
                                                            ? "Best for HireReady AI"
                                                            : theme === "Light"
                                                                ? "Light interface"
                                                                : "Follow system"}
                                                    </div>

                                                </button>

                                            )
                                        )}

                                    </div>

                                </div>

                            </SettingsCard>

                        )}


                        {/* SAVE BAR */}
                        <div
                            className="sticky bottom-5
                            rounded-2xl
                            border border-white/[0.08]
                            bg-[#101219]/95
                            backdrop-blur-xl
                            p-4
                            flex items-center
                            justify-between
                            gap-4"
                        >

                            <div>

                                {saved ? (
                                    <p className="text-sm text-emerald-400">
                                        ✓ Changes saved successfully
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        Changes are saved when you click
                                        Save Changes.
                                    </p>
                                )}

                            </div>


                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                to-purple-600
                                hover:from-violet-500
                                hover:to-purple-500
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                shadow-lg
                                shadow-purple-900/20
                                text-sm font-medium
                                transition"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};


/* =========================================================
   REUSABLE COMPONENTS
========================================================= */


const SettingsButton = ({
    icon,
    label,
    active,
    onClick,
}) => (

    <button
        onClick={onClick}
        className={`w-full flex items-center
        gap-3 px-4 py-3 rounded-xl
        mb-1 text-sm transition ${
            active
                ? "bg-purple-600/15 text-purple-300 border border-purple-500/20"
                : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
        }`}
    >

        <span className="w-7 text-center">
            {icon}
        </span>

        <span>
            {label}
        </span>

    </button>
);


const SettingsCard = ({
    title,
    description,
    children,
}) => (

    <section
        className="rounded-2xl
        border border-white/[0.07]
        bg-[#0e1017]
        overflow-hidden"
    >

        <div
            className="px-6 md:px-7 py-6
            border-b border-white/[0.06]"
        >

            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                {description}
            </p>

        </div>


        <div className="px-6 md:px-7">
            {children}
        </div>

    </section>
);


const SettingRow = ({
    title,
    description,
    children,
}) => (

    <div
        className="py-5
        flex flex-col sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        border-b border-white/[0.05]
        last:border-0"
    >

        <div>

            <p className="text-sm font-medium text-gray-200">
                {title}
            </p>

            <p className="text-xs text-gray-600 mt-1">
                {description}
            </p>

        </div>

        <div>
            {children}
        </div>

    </div>
);


const ToggleSetting = ({
    title,
    description,
    checked,
    onChange,
}) => (

    <div
        className="py-5
        flex items-center
        justify-between
        gap-5
        border-b border-white/[0.05]
        last:border-0"
    >

        <div>

            <p className="text-sm font-medium text-gray-200">
                {title}
            </p>

            <p className="text-xs text-gray-600 mt-1 max-w-xl">
                {description}
            </p>

        </div>


        <button
            onClick={() => onChange(!checked)}
            className={`relative flex-shrink-0
            w-11 h-6 rounded-full
            transition ${
                checked
                    ? "bg-purple-600"
                    : "bg-white/[0.1]"
            }`}
        >

            <span
                className={`absolute top-1
                w-4 h-4 rounded-full
                bg-white transition-all ${
                    checked
                        ? "left-6"
                        : "left-1"
                }`}
            />

        </button>

    </div>
);


const SelectSetting = ({
    title,
    description,
    value,
    options,
    onChange,
}) => (

    <div
        className="py-5
        flex flex-col sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        border-b border-white/[0.05]"
    >

        <div>

            <p className="text-sm font-medium text-gray-200">
                {title}
            </p>

            <p className="text-xs text-gray-600 mt-1 max-w-xl">
                {description}
            </p>

        </div>


        <select
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="w-full sm:w-44
            px-3 py-2.5
            rounded-lg
            bg-[#090b10]
            border border-white/[0.08]
            text-sm text-gray-300
            outline-none
            focus:border-purple-500/50"
        >

            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                    className="bg-[#0e1017]"
                >
                    {option}
                </option>
            ))}

        </select>

    </div>
);


export default Settings;