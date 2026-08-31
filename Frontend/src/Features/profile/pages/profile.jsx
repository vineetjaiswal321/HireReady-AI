import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center">
                Loading profile...
            </div>
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
        <div className="min-h-screen bg-[#08090d] text-white">

            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-[20%] w-[500px] h-[500px]
                    bg-purple-600/10 blur-[140px] rounded-full" />

                <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px]
                    bg-violet-600/10 blur-[140px] rounded-full" />
            </div>


            <main className="relative max-w-7xl mx-auto px-5 md:px-8 py-8">

                {/* PAGE HEADER */}
                <div className="flex flex-col sm:flex-row
                    sm:items-center sm:justify-between gap-5 mb-8">

                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-sm text-gray-500 hover:text-gray-300
                                transition mb-3"
                        >
                            ← Back
                        </button>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            My Profile
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Your professional identity on HireReady AI
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/update-profile")}
                        className="group flex items-center justify-center gap-2
                            px-5 py-3 rounded-xl
                            bg-gradient-to-r from-violet-600 to-purple-600
                            hover:from-violet-500 hover:to-purple-500
                            shadow-lg shadow-purple-900/20
                            transition-all"
                    >
                        <span>✎</span>
                        Edit Profile
                    </button>

                </div>


                {/* PROFILE HERO */}
                <section className="relative overflow-hidden
                    rounded-3xl border border-white/[0.08]
                    bg-[#0e1017]">

                    {/* gradient */}
                    <div className="absolute inset-0
                        bg-gradient-to-br from-purple-600/[0.08]
                        via-transparent to-transparent" />

                    <div className="relative p-6 md:p-8">

                        <div className="flex flex-col lg:flex-row
                            lg:items-start gap-7">

                            {/* Avatar */}
                            <div className="relative shrink-0">

                                <div className="w-28 h-28 md:w-32 md:h-32
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-violet-500 to-purple-700
                                    p-[2px]">

                                    <div className="w-full h-full rounded-[22px]
                                        bg-[#11131b]
                                        flex items-center justify-center
                                        text-4xl font-bold">

                                        {user.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}

                                    </div>
                                </div>

                                <div className="absolute -bottom-2 -right-2
                                    w-7 h-7 rounded-full
                                    bg-emerald-500
                                    border-4 border-[#0e1017]" />

                            </div>


                            {/* Identity */}
                            <div className="flex-1">

                                <div className="flex flex-wrap
                                    items-center gap-3">

                                    <h2 className="text-2xl md:text-3xl
                                        font-bold">

                                        {user.name || "Your Name"}

                                    </h2>

                                    <span className="flex items-center
                                        justify-center w-6 h-6 rounded-full
                                        bg-purple-500/20 text-purple-400
                                        text-xs">
                                        ✓
                                    </span>

                                </div>

                                <p className="text-purple-400 font-medium mt-1">
                                    {user.headline ||
                                        "Add your professional headline"}
                                </p>


                                <div className="flex flex-wrap gap-x-5 gap-y-2
                                    mt-4 text-sm text-gray-500">

                                    {user.location && (
                                        <span>
                                            ◉ {user.location}
                                        </span>
                                    )}

                                    {user.email && (
                                        <span>
                                            ✉ {user.email}
                                        </span>
                                    )}

                                    {user.phone && (
                                        <span>
                                            ☎ {user.phone}
                                        </span>
                                    )}

                                </div>


                                {user.bio && (
                                    <p className="max-w-2xl text-gray-400
                                        leading-relaxed mt-5">
                                        {user.bio}
                                    </p>
                                )}

                            </div>


                            {/* Profile strength */}
                            <div className="lg:w-60
                                rounded-2xl border border-white/[0.07]
                                bg-white/[0.02] p-5">

                                <div className="flex justify-between
                                    items-center">

                                    <span className="text-sm text-gray-400">
                                        Profile Strength
                                    </span>

                                    <span className="text-purple-400
                                        font-semibold">
                                        87%
                                    </span>

                                </div>

                                <div className="h-2 bg-white/[0.06]
                                    rounded-full mt-4 overflow-hidden">

                                    <div
                                        className="h-full w-[87%]
                                            bg-gradient-to-r
                                            from-violet-600 to-purple-400
                                            rounded-full"
                                    />

                                </div>

                                <p className="text-xs text-gray-600 mt-3">
                                    Complete your profile to unlock better
                                    AI recommendations.
                                </p>

                            </div>

                        </div>


                        {/* Social links */}
                        <div className="flex flex-wrap gap-3
                            border-t border-white/[0.06]
                            mt-7 pt-6">

                            <SocialLink
                                label="GitHub"
                                url={user.socialLinks?.github}
                            />

                            <SocialLink
                                label="LinkedIn"
                                url={user.socialLinks?.linkedin}
                            />

                            <SocialLink
                                label="Portfolio"
                                url={user.socialLinks?.portfolio}
                            />

                            <SocialLink
                                label="X / Twitter"
                                url={user.socialLinks?.twitter}
                            />

                        </div>

                    </div>
                </section>


                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

                    <StatCard
                        number={skillsCount}
                        label="Skills"
                        icon="✦"
                    />

                    <StatCard
                        number={projectCount}
                        label="Projects"
                        icon="▣"
                    />

                    <StatCard
                        number={experienceCount}
                        label="Experience"
                        icon="⌁"
                    />

                    <StatCard
                        number={achievementCount}
                        label="Achievements"
                        icon="★"
                    />

                </div>


                {/* MAIN GRID */}
                <div className="grid lg:grid-cols-2 gap-5 mt-5">

                    {/* SKILLS */}
                    <Card title="Technical Skills" icon="⌘">

                        <SkillGroup
                            title="Languages"
                            skills={user.skills?.languages}
                        />

                        <SkillGroup
                            title="Frontend"
                            skills={user.skills?.frontend}
                        />

                        <SkillGroup
                            title="Backend"
                            skills={user.skills?.backend}
                        />

                        <SkillGroup
                            title="Databases"
                            skills={user.skills?.databases}
                        />

                        <SkillGroup
                            title="Tools"
                            skills={user.skills?.tools}
                        />

                        {!skillsCount && (
                            <Empty text="No skills added yet." />
                        )}

                    </Card>


                    {/* CODING PROFILES */}
                    <Card title="Coding Profiles" icon="<>">

                        <CodingProfile
                            name="LeetCode"
                            url={user.codingProfiles?.leetcode}
                        />

                        <CodingProfile
                            name="GeeksforGeeks"
                            url={user.codingProfiles?.geeksforgeeks}
                        />

                        <CodingProfile
                            name="CodeChef"
                            url={user.codingProfiles?.codechef}
                        />

                        <CodingProfile
                            name="Codeforces"
                            url={user.codingProfiles?.codeforces}
                        />

                        <CodingProfile
                            name="HackerRank"
                            url={user.codingProfiles?.hackerrank}
                        />

                        {!Object.values(
                            user.codingProfiles || {}
                        ).some(Boolean) && (
                            <Empty text="No coding profiles added yet." />
                        )}

                    </Card>

                </div>


                {/* EXPERIENCE + PROJECTS */}
                <div className="grid lg:grid-cols-2 gap-5 mt-5">

                    {/* EXPERIENCE */}
                    <Card
                        title="Experience"
                        icon="◫"
                        action={
                            user.experience?.length > 2
                                ? "View all"
                                : null
                        }
                    >

                        {user.experience?.length ? (
                            user.experience.map((exp, index) => (

                                <div
                                    key={index}
                                    className="relative pl-6 pb-6
                                        last:pb-0"
                                >

                                    <div className="absolute left-0 top-1
                                        w-2.5 h-2.5 rounded-full
                                        bg-purple-500
                                        shadow-[0_0_12px_rgba(139,92,246,.7)]" />

                                    {index !==
                                        user.experience.length - 1 && (
                                        <div className="absolute left-[4px]
                                            top-4 bottom-0 w-px
                                            bg-white/[0.08]" />
                                    )}

                                    <div className="flex justify-between gap-4">

                                        <div>

                                            <h3 className="font-semibold">
                                                {exp.role}
                                            </h3>

                                            <p className="text-purple-400
                                                text-sm mt-1">
                                                {exp.company}
                                            </p>

                                        </div>

                                        <span className="text-xs
                                            text-gray-600 whitespace-nowrap">
                                            {formatDate(exp.startDate)}
                                            {" — "}
                                            {exp.currentlyWorking
                                                ? "Present"
                                                : formatDate(exp.endDate)}
                                        </span>

                                    </div>

                                    {exp.description && (
                                        <p className="text-sm text-gray-500
                                            mt-3 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}

                                </div>

                            ))
                        ) : (
                            <Empty text="No experience added yet." />
                        )}

                    </Card>


                    {/* PROJECTS */}
                    <Card
                        title="Projects"
                        icon="▣"
                        action={
                            user.projects?.length ? "View all" : null
                        }
                    >

                        {user.projects?.length ? (
                            <div className="space-y-3">

                                {user.projects
                                    .slice(0, 3)
                                    .map((project, index) => (

                                        <div
                                            key={index}
                                            className="p-4 rounded-xl
                                                border border-white/[0.06]
                                                bg-white/[0.02]
                                                hover:border-purple-500/20
                                                transition"
                                        >

                                            <div className="flex
                                                justify-between gap-4">

                                                <div>

                                                    <h3 className="font-semibold">
                                                        {project.name}
                                                    </h3>

                                                    <p className="text-sm
                                                        text-gray-500 mt-1
                                                        line-clamp-2">
                                                        {project.description}
                                                    </p>

                                                </div>

                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-gray-500
                                                            hover:text-purple-400"
                                                    >
                                                        ↗
                                                    </a>
                                                )}

                                            </div>


                                            <div className="flex flex-wrap
                                                gap-2 mt-3">

                                                {project.technologies
                                                    ?.map((tech, i) => (

                                                        <span
                                                            key={i}
                                                            className="px-2.5 py-1
                                                                rounded-md
                                                                bg-purple-500/10
                                                                text-purple-300
                                                                text-xs"
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


                {/* EDUCATION / ACHIEVEMENTS */}
                <div className="grid md:grid-cols-2 gap-5 mt-5">

                    <Card title="Education" icon="▤">

                        {user.education?.length ? (
                            user.education.map((edu, index) => (

                                <div
                                    key={index}
                                    className="py-3
                                        border-b border-white/[0.06]
                                        last:border-0"
                                >

                                    <h3 className="font-semibold">
                                        {edu.institution}
                                    </h3>

                                    <p className="text-purple-400 text-sm mt-1">
                                        {edu.degree}
                                    </p>

                                    <p className="text-gray-500 text-sm mt-1">
                                        {edu.field}
                                    </p>

                                    <p className="text-gray-600 text-xs mt-2">
                                        {edu.startYear} — {edu.endYear}
                                    </p>

                                </div>

                            ))
                        ) : (
                            <Empty text="No education details added yet." />
                        )}

                    </Card>


                    <Card title="Achievements" icon="★">

                        {user.achievements?.length ? (
                            user.achievements.map((item, index) => (

                                <div
                                    key={index}
                                    className="flex gap-4 py-3
                                        border-b border-white/[0.06]
                                        last:border-0"
                                >

                                    <div className="w-9 h-9 rounded-lg
                                        bg-purple-500/10
                                        text-purple-400
                                        flex items-center justify-center
                                        shrink-0">
                                        ★
                                    </div>

                                    <div>

                                        <h3 className="text-sm font-medium">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-gray-500
                                            mt-1">
                                            {item.description}
                                        </p>

                                    </div>

                                </div>

                            ))
                        ) : (
                            <Empty text="No achievements added yet." />
                        )}

                    </Card>

                </div>


                {/* AI CTA */}
                <div className="relative overflow-hidden
                    mt-5 mb-10 rounded-2xl
                    border border-purple-500/20
                    bg-gradient-to-r
                    from-purple-900/30
                    via-violet-900/20
                    to-transparent">

                    <div className="p-6 md:p-7
                        flex flex-col md:flex-row
                        md:items-center
                        md:justify-between gap-5">

                        <div>

                            <div className="flex items-center gap-2">

                                <span className="w-8 h-8 rounded-lg
                                    bg-purple-500/20
                                    flex items-center justify-center
                                    text-purple-400">
                                    ✦
                                </span>

                                <h3 className="font-semibold">
                                    Ready to improve your profile?
                                </h3>

                            </div>

                            <p className="text-sm text-gray-500 mt-2">
                                Let HireReady AI analyze your profile and
                                suggest improvements for your target roles.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/update-profile")}
                            className="px-5 py-3 rounded-xl
                                bg-purple-600 hover:bg-purple-500
                                transition whitespace-nowrap"
                        >
                            Improve Profile →
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};


/* ---------------- COMPONENTS ---------------- */

const Card = ({ title, icon, action, children }) => (
    <section className="rounded-2xl
        border border-white/[0.07]
        bg-[#0e1017]
        p-5 md:p-6">

        <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg
                    bg-purple-500/10
                    text-purple-400
                    flex items-center justify-center">
                    {icon}
                </div>

                <h2 className="font-semibold text-lg">
                    {title}
                </h2>

            </div>

            {action && (
                <button className="text-sm text-purple-400
                    hover:text-purple-300">
                    {action} →
                </button>
            )}

        </div>

        {children}

    </section>
);


const StatCard = ({ number, label, icon }) => (
    <div className="rounded-2xl
        border border-white/[0.07]
        bg-[#0e1017]
        p-5">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-2xl font-bold">
                    {number}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                    {label}
                </p>
            </div>

            <div className="w-10 h-10 rounded-xl
                bg-purple-500/10
                text-purple-400
                flex items-center justify-center">
                {icon}
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
            className="px-4 py-2 rounded-xl
                border border-white/[0.07]
                bg-white/[0.02]
                text-sm text-gray-400
                hover:text-white
                hover:border-purple-500/30
                transition"
        >
            {label} ↗
        </a>
    );
};


const CodingProfile = ({ name, url }) => {

    if (!url) return null;

    return (
        <div className="flex items-center justify-between
            p-3 rounded-xl
            border border-white/[0.05]
            bg-white/[0.02]
            mb-2 last:mb-0">

            <span className="font-medium text-sm">
                {name}
            </span>

            <div className="flex items-center gap-4">

                <span className="text-xs text-gray-600">
                    Connected
                </span>

                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-purple-400
                        hover:text-purple-300"
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

            <p className="text-xs uppercase tracking-wider
                text-gray-600 mb-2">
                {title}
            </p>

            <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (

                    <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg
                            bg-white/[0.04]
                            border border-white/[0.05]
                            text-sm text-gray-300"
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </div>
    );
};


const Empty = ({ text }) => (
    <div className="py-6 text-center
        text-sm text-gray-600">
        {text}
    </div>
);


const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });
};


export default Profile;