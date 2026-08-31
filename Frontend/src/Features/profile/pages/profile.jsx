import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BriefcaseBusiness,
    Check,
    Code2,
    ExternalLink,
    GraduationCap,
    Layers,
    Loader2,
    Mail,
    MapPin,
    Pencil,
    Phone,
    Sparkles,
    Star,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import PageShell from "../../layout/PageShell.jsx";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                            Loading profile...
                        </p>
                    </div>
                </div>
            </PageShell>
        );
    }

    const skillsCount =
        (user.skills?.languages?.length || 0) +
        (user.skills?.frontend?.length || 0) +
        (user.skills?.backend?.length || 0) +
        (user.skills?.databases?.length || 0) +
        (user.skills?.tools?.length || 0);

    const projectCount = user.projects?.length || 0;
    const experienceCount = user.experience?.length || 0;
    const achievementCount = user.achievements?.length || 0;

    return (
        <PageShell>
            <main className="relative mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <button
                            onClick={() => navigate("/")}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                        >
                            <ArrowLeft size={15} />
                            Back to Home
                        </button>

                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                                PROFESSIONAL PROFILE
                            </span>
                        </div>

                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                            My Profile
                        </h1>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Your professional identity on HireReady AI
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/update-profile")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
                    >
                        <Pencil size={15} />
                        Edit Profile
                    </button>
                </div>

                <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-transparent" />

                    <div className="relative p-6 md:p-8">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
                            <div className="relative shrink-0">
                                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-violet-600 text-4xl font-bold text-white md:h-32 md:w-32">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-4 border-white bg-emerald-500 dark:border-[#111113]" />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-white">
                                        {user.name || "Your Name"}
                                    </h2>
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                                        <Check size={12} />
                                    </span>
                                </div>

                                <p className="mt-1 font-medium text-violet-700 dark:text-violet-400">
                                    {user.headline || "Add your professional headline"}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    {user.location && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin size={14} />
                                            {user.location}
                                        </span>
                                    )}
                                    {user.email && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Mail size={14} />
                                            {user.email}
                                        </span>
                                    )}
                                    {user.phone && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Phone size={14} />
                                            {user.phone}
                                        </span>
                                    )}
                                </div>

                                {user.bio && (
                                    <p className="mt-5 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {user.bio}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 lg:w-60 dark:border-white/10 dark:bg-white/[0.03]">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Profile Strength
                                    </span>
                                    <span className="font-semibold text-violet-700 dark:text-violet-400">
                                        87%
                                    </span>
                                </div>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/[0.06]">
                                    <div className="h-full w-[87%] rounded-full bg-violet-600" />
                                </div>

                                <p className="mt-3 text-xs text-zinc-500">
                                    Complete your profile to unlock better AI recommendations.
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3 border-t border-zinc-200 pt-6 dark:border-white/10">
                            <SocialLink label="GitHub" url={user.socialLinks?.github} />
                            <SocialLink label="LinkedIn" url={user.socialLinks?.linkedin} />
                            <SocialLink label="Portfolio" url={user.socialLinks?.portfolio} />
                            <SocialLink label="X / Twitter" url={user.socialLinks?.twitter} />
                        </div>
                    </div>
                </section>

                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard number={skillsCount} label="Skills" icon={Sparkles} />
                    <StatCard number={projectCount} label="Projects" icon={Layers} />
                    <StatCard number={experienceCount} label="Experience" icon={BriefcaseBusiness} />
                    <StatCard number={achievementCount} label="Achievements" icon={Star} />
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <Card title="Technical Skills" icon={Code2}>
                        <SkillGroup title="Languages" skills={user.skills?.languages} />
                        <SkillGroup title="Frontend" skills={user.skills?.frontend} />
                        <SkillGroup title="Backend" skills={user.skills?.backend} />
                        <SkillGroup title="Databases" skills={user.skills?.databases} />
                        <SkillGroup title="Tools" skills={user.skills?.tools} />
                        {!skillsCount && <Empty text="No skills added yet." />}
                    </Card>

                    <Card title="Coding Profiles" icon={Code2}>
                        <CodingProfile name="LeetCode" url={user.codingProfiles?.leetcode} />
                        <CodingProfile name="GeeksforGeeks" url={user.codingProfiles?.geeksforgeeks} />
                        <CodingProfile name="CodeChef" url={user.codingProfiles?.codechef} />
                        <CodingProfile name="Codeforces" url={user.codingProfiles?.codeforces} />
                        <CodingProfile name="HackerRank" url={user.codingProfiles?.hackerrank} />
                        {!Object.values(user.codingProfiles || {}).some(Boolean) && (
                            <Empty text="No coding profiles added yet." />
                        )}
                    </Card>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <Card
                        title="Experience"
                        icon={BriefcaseBusiness}
                        action={user.experience?.length > 2 ? "View all" : null}
                    >
                        {user.experience?.length ? (
                            user.experience.map((exp, index) => (
                                <div key={index} className="relative pb-6 pl-6 last:pb-0">
                                    <div className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-violet-600" />
                                    {index !== user.experience.length - 1 && (
                                        <div className="absolute left-[4px] top-4 bottom-0 w-px bg-zinc-200 dark:bg-white/10" />
                                    )}

                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-zinc-950 dark:text-white">
                                                {exp.role}
                                            </h3>
                                            <p className="mt-1 text-sm text-violet-700 dark:text-violet-400">
                                                {exp.company}
                                            </p>
                                        </div>
                                        <span className="whitespace-nowrap text-xs text-zinc-500">
                                            {formatDate(exp.startDate)}
                                            {" — "}
                                            {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                                        </span>
                                    </div>

                                    {exp.description && (
                                        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <Empty text="No experience added yet." />
                        )}
                    </Card>

                    <Card
                        title="Projects"
                        icon={Layers}
                        action={user.projects?.length ? "View all" : null}
                    >
                        {user.projects?.length ? (
                            <div className="space-y-3">
                                {user.projects.slice(0, 3).map((project, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-500/30"
                                    >
                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold text-zinc-950 dark:text-white">
                                                    {project.name}
                                                </h3>
                                                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                    {project.description}
                                                </p>
                                            </div>
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-zinc-400 transition hover:text-violet-600 dark:hover:text-violet-400"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {project.technologies?.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-md bg-violet-50 px-2.5 py-1 text-xs text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty text="No projects added yet." />
                        )}
                    </Card>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Card title="Education" icon={GraduationCap}>
                        {user.education?.length ? (
                            user.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="border-b border-zinc-200 py-3 last:border-0 dark:border-white/10"
                                >
                                    <h3 className="font-semibold text-zinc-950 dark:text-white">
                                        {edu.institution}
                                    </h3>
                                    <p className="mt-1 text-sm text-violet-700 dark:text-violet-400">
                                        {edu.degree}
                                    </p>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{edu.field}</p>
                                    <p className="mt-2 text-xs text-zinc-500">
                                        {edu.startYear} — {edu.endYear}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <Empty text="No education details added yet." />
                        )}
                    </Card>

                    <Card title="Achievements" icon={Award}>
                        {user.achievements?.length ? (
                            user.achievements.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 border-b border-zinc-200 py-3 last:border-0 dark:border-white/10"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                        <Star size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-zinc-950 dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-zinc-500">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Empty text="No achievements added yet." />
                        )}
                    </Card>
                </div>

                <div className="relative mt-5 mb-10 overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 dark:border-violet-500/20 dark:from-violet-500/10 dark:via-[#111113] dark:to-transparent">
                    <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">
                                    <Sparkles size={16} />
                                </span>
                                <h3 className="font-semibold text-zinc-950 dark:text-white">
                                    Ready to improve your profile?
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                Let HireReady AI analyze your profile and suggest improvements for your target roles.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/update-profile")}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                        >
                            Improve Profile
                            <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </main>
        </PageShell>
    );
};

const Card = ({ title, icon: Icon, action, children }) => (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-6 dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
        <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <Icon size={16} />
                </div>
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">{title}</h2>
            </div>
            {action && (
                <button className="text-sm text-violet-700 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300">
                    {action} →
                </button>
            )}
        </div>
        {children}
    </section>
);

const StatCard = ({ number, label, icon: Icon }) => (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-2xl font-semibold text-zinc-950 dark:text-white">{number}</p>
                <p className="mt-1 text-sm text-zinc-500">{label}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <Icon size={18} />
            </div>
        </div>
    </div>
);

const SocialLink = ({ label, url }) => {
    if (!url) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 transition hover:border-violet-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-violet-500/30 dark:hover:text-white"
        >
            {label}
            <ExternalLink size={13} />
        </a>
    );
};

const CodingProfile = ({ name, url }) => {
    if (!url) return null;

    return (
        <div className="mb-2 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3 last:mb-0 dark:border-white/10 dark:bg-white/[0.03]">
            <span className="text-sm font-medium text-zinc-900 dark:text-white">{name}</span>
            <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500">Connected</span>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-violet-700 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Visit →
                </a>
            </div>
        </div>
    );
};

const SkillGroup = ({ title, skills }) => {
    if (!skills?.length) return null;

    return (
        <div className="mb-5 last:mb-0">
            <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">{title}</p>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Empty = ({ text }) => (
    <div className="py-6 text-center text-sm text-zinc-500">{text}</div>
);

const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

export default Profile;
