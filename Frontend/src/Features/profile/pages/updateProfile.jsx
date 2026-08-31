import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Award,
    BriefcaseBusiness,
    Code2,
    GraduationCap,
    Layers,
    Link2,
    Loader2,
    Plus,
    Sparkles,
    User,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { updateProfile } from "../services/profile.api";
import PageShell from "../../layout/PageShell.jsx";

const UpdateProfile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("personal");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [profile, setProfile] = useState({
        name: "",
        headline: "",
        bio: "",
        location: "",
        phone: "",

        socialLinks: {
            github: "",
            linkedin: "",
            portfolio: "",
            twitter: "",
        },

        codingProfiles: {
            leetcode: "",
            geeksforgeeks: "",
            codechef: "",
            codeforces: "",
            hackerrank: "",
        },

        skills: {
            languages: [],
            frontend: [],
            backend: [],
            databases: [],
            tools: [],
        },

        education: [],
        experience: [],
        projects: [],
        achievements: [],
    });

    /*
     * Load user data
     */
    useEffect(() => {
        if (!user) return;

        setProfile({
            name: user.name || "",
            headline: user.headline || "",
            bio: user.bio || "",
            location: user.location || "",
            phone: user.phone || "",

            socialLinks: {
                github: user.socialLinks?.github || "",
                linkedin: user.socialLinks?.linkedin || "",
                portfolio: user.socialLinks?.portfolio || "",
                twitter: user.socialLinks?.twitter || "",
            },

            codingProfiles: {
                leetcode: user.codingProfiles?.leetcode || "",
                geeksforgeeks:
                    user.codingProfiles?.geeksforgeeks || "",
                codechef: user.codingProfiles?.codechef || "",
                codeforces: user.codingProfiles?.codeforces || "",
                hackerrank: user.codingProfiles?.hackerrank || "",
            },

            skills: {
                languages: user.skills?.languages || [],
                frontend: user.skills?.frontend || [],
                backend: user.skills?.backend || [],
                databases: user.skills?.databases || [],
                tools: user.skills?.tools || [],
            },
            education: (user.education || []).map(
                (education, index) => ({
                    ...education,
                    order: education.order || index + 1,
                })
            ),
            experience: (user.experience || []).map(
                (experience, index) => ({
                    ...experience,
                    order: experience.order || index + 1,
                })
            ),
            projects: (user.projects || []).map((project, index) => ({
                ...project,
                order: project.order || index + 1,
            })),
            achievements: (user.achievements || []).map(
                (achievement, index) => ({
                    ...achievement,
                    order: achievement.order || index + 1,
                })
            ),
        });
    }, [user]);

    /*
     * Profile completion
     */
    const completion = useMemo(() => {

        const checks = [
            profile.name,
            profile.headline,
            profile.bio,
            profile.location,

            profile.socialLinks.github,
            profile.socialLinks.linkedin,

            profile.codingProfiles.leetcode,

            profile.skills.languages.length,
            profile.skills.frontend.length,

            profile.education.length,
            profile.experience.length,
            profile.projects.length,
        ];

        const completed = checks.filter(Boolean).length;

        return Math.round((completed / checks.length) * 100);

    }, [profile]);


    /*
     * Basic fields
     */
    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    /*
     * Social links
     */
    const handleSocialChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,

            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            },
        }));

    };


    /*
     * Coding profiles
     */
    const handleCodingChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,

            codingProfiles: {
                ...prev.codingProfiles,
                [name]: value,
            },
        }));

    };


    /*
     * Skills
     */
    const addSkill = (category, value) => {

        const skill = value.trim();

        if (!skill) return;

        if (profile.skills[category].includes(skill)) {
            return;
        }

        setProfile((prev) => ({
            ...prev,

            skills: {
                ...prev.skills,

                [category]: [
                    ...prev.skills[category],
                    skill,
                ],
            },
        }));

    };


    const removeSkill = (category, skillToRemove) => {

        setProfile((prev) => ({
            ...prev,

            skills: {
                ...prev.skills,

                [category]: prev.skills[category].filter(
                    (skill) => skill !== skillToRemove
                ),
            },
        }));

    };


    /*
     * Education
     */
    const addEducation = () => {
        setProfile((prev) => {

            const maxOrder = prev.education.reduce(
                (max, education) =>
                    Math.max(max, education.order || 0),
                0
            );

            const newEducation = {
                id: crypto.randomUUID(),
                order: maxOrder + 1,

                institution: "",
                degree: "",
                field: "",
                startYear: "",
                endYear: "",
                grade: "",
            };

            return {
                ...prev,

                // New education appears at the top
                education: [
                    newEducation,
                    ...prev.education,
                ],
            };
        });
    };


    const updateEducation = (index, field, value) => {

        setProfile((prev) => {

            const education = [...prev.education];

            education[index] = {
                ...education[index],
                [field]: value,
            };

            return {
                ...prev,
                education,
            };

        });

    };


    const removeEducation = (index) => {

        setProfile((prev) => ({
            ...prev,

            education: prev.education.filter(
                (_, i) => i !== index
            ),
        }));

    };


    /*
     * Experience
     */
    const addExperience = () => {
        setProfile((prev) => {

            const maxOrder = prev.experience.reduce(
                (max, experience) =>
                    Math.max(max, experience.order || 0),
                0
            );

            const newExperience = {
                id: crypto.randomUUID(),
                order: maxOrder + 1,

                company: "",
                role: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                description: "",
            };

            return {
                ...prev,

                // New experience appears at the top
                experience: [
                    newExperience,
                    ...prev.experience,
                ],
            };
        });
    };


    const updateExperience = (index, field, value) => {

        setProfile((prev) => {

            const experience = [...prev.experience];

            experience[index] = {
                ...experience[index],
                [field]: value,
            };

            return {
                ...prev,
                experience,
            };

        });

    };


    const removeExperience = (index) => {

        setProfile((prev) => ({
            ...prev,

            experience: prev.experience.filter(
                (_, i) => i !== index
            ),
        }));

    };


    /*
     * Projects
     */
    const addProject = () => {
        setProfile((prev) => {

            const maxOrder = prev.projects.reduce(
                (max, project) => Math.max(max, project.order || 0),
                0
            );

            const newProject = {
                id: crypto.randomUUID(),
                order: maxOrder + 1,

                name: "",
                description: "",
                technologies: [],
                githubUrl: "",
                liveUrl: "",
                role: "",
            };

            return {
                ...prev,

                // New project appears at TOP
                projects: [
                    newProject,
                    ...prev.projects,
                ],
            };
        });
    };

    const updateProject = (index, field, value) => {

        setProfile((prev) => {

            const projects = [...prev.projects];

            projects[index] = {
                ...projects[index],
                [field]: value,
            };

            return {
                ...prev,
                projects,
            };

        });

    };


    const removeProject = (index) => {

        setProfile((prev) => ({
            ...prev,

            projects: prev.projects.filter(
                (_, i) => i !== index
            ),
        }));

    };


    /*
     * Achievements
     */
    const addAchievement = () => {
        setProfile((prev) => {

            const maxOrder = prev.achievements.reduce(
                (max, achievement) =>
                    Math.max(max, achievement.order || 0),
                0
            );

            const newAchievement = {
                id: crypto.randomUUID(),
                order: maxOrder + 1,

                title: "",
                description: "",
                date: "",
            };

            return {
                ...prev,

                // New achievement appears at the top
                achievements: [
                    newAchievement,
                    ...prev.achievements,
                ],
            };
        });
    };


    const updateAchievement = (index, field, value) => {

        setProfile((prev) => {

            const achievements = [...prev.achievements];

            achievements[index] = {
                ...achievements[index],
                [field]: value,
            };

            return {
                ...prev,
                achievements,
            };

        });

    };


    const removeAchievement = (index) => {

        setProfile((prev) => ({
            ...prev,

            achievements: prev.achievements.filter(
                (_, i) => i !== index
            ),
        }));

    };


    /*
     * Save profile
     */
    const handleSave = async () => {
        try {
            setSaving(true)
            setError("")
            setMessage("")

            const response=await updateProfile(profile)

            const updatedUser=response.data
            
            setUser(updatedUser)

            setMessage("Profile Updated Successfully")

            setTimeout(()=>{
                navigate("/profile")
            }, 700);


        } catch (error) {
            console.log(error)
            throw error
        } finally{
            setSaving(false)
        }

    };


    if (!user) {

        return (
            <PageShell>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-600 dark:text-violet-400" />
                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                            Loading...
                        </p>
                    </div>
                </div>
            </PageShell>
        );

    }


    return (
        <PageShell>
            <main className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">


                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <button
                            onClick={() => navigate("/profile")}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                        >
                            <ArrowLeft size={15} />
                            Back to Profile
                        </button>

                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                                PROFILE EDITOR
                            </span>
                        </div>

                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                            Edit Profile
                        </h1>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Build a stronger professional profile for better AI recommendations.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/profile")}
                            className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>


                {/* Main layout */}
                <div className="grid lg:grid-cols-[240px_1fr]
                    gap-6">


                    <aside className="h-fit lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                            <SectionButton
                                active={activeSection === "personal"}
                                onClick={() => setActiveSection("personal")}
                                icon={User}
                                label="Personal Info"
                            />
                            <SectionButton
                                active={activeSection === "social"}
                                onClick={() => setActiveSection("social")}
                                icon={Link2}
                                label="Social Links"
                            />
                            <SectionButton
                                active={activeSection === "coding"}
                                onClick={() => setActiveSection("coding")}
                                icon={Code2}
                                label="Coding Profiles"
                            />
                            <SectionButton
                                active={activeSection === "skills"}
                                onClick={() => setActiveSection("skills")}
                                icon={Sparkles}
                                label="Skills"
                            />
                            <SectionButton
                                active={activeSection === "education"}
                                onClick={() => setActiveSection("education")}
                                icon={GraduationCap}
                                label="Education"
                            />
                            <SectionButton
                                active={activeSection === "experience"}
                                onClick={() => setActiveSection("experience")}
                                icon={BriefcaseBusiness}
                                label="Experience"
                            />
                            <SectionButton
                                active={activeSection === "projects"}
                                onClick={() => setActiveSection("projects")}
                                icon={Layers}
                                label="Projects"
                            />
                            <SectionButton
                                active={activeSection === "achievements"}
                                onClick={() => setActiveSection("achievements")}
                                icon={Award}
                                label="Achievements"
                            />
                        </div>

                        <div className="mt-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 dark:border-violet-500/20 dark:from-violet-500/10 dark:to-transparent">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium text-zinc-950 dark:text-white">
                                        Profile Strength
                                    </p>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Keep improving your profile
                                    </p>
                                </div>
                                <span className="font-bold text-violet-700 dark:text-violet-400">
                                    {completion}%
                                </span>
                            </div>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/[0.06]">
                                <div
                                    className="h-full rounded-full bg-violet-600 transition-all"
                                    style={{ width: `${completion}%` }}
                                />
                            </div>
                        </div>
                    </aside>


                    {/* CONTENT */}
                    <div>


                        {/* PERSONAL */}
                        {activeSection === "personal" && (

                            <EditorCard
                                title="Personal Information"
                                description="Tell recruiters and HireReady AI who you are."
                            >

                                <div className="grid md:grid-cols-2 gap-5">

                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                    />

                                    <Input
                                        label="Location"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                        placeholder="e.g. New Delhi, India"
                                    />

                                    <Input
                                        label="Phone"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        placeholder="+91 XXXXX XXXXX"
                                    />

                                    <Input
                                        label="Professional Headline"
                                        name="headline"
                                        value={profile.headline}
                                        onChange={handleChange}
                                        placeholder="Full Stack Developer"
                                    />

                                </div>


                                <div className="mt-5">

                                    <TextArea
                                        label="About You"
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleChange}
                                        placeholder="Tell recruiters about your experience, interests and career goals..."
                                    />

                                </div>

                            </EditorCard>

                        )}


                        {/* SOCIAL */}
                        {activeSection === "social" && (

                            <EditorCard
                                title="Social & Professional Links"
                                description="Connect your professional presence."
                            >

                                <div className="space-y-5">

                                    <Input
                                        label="GitHub"
                                        name="github"
                                        value={profile.socialLinks.github}
                                        onChange={handleSocialChange}
                                        placeholder="https://github.com/username"
                                    />

                                    <Input
                                        label="LinkedIn"
                                        name="linkedin"
                                        value={profile.socialLinks.linkedin}
                                        onChange={handleSocialChange}
                                        placeholder="https://linkedin.com/in/username"
                                    />

                                    <Input
                                        label="Portfolio"
                                        name="portfolio"
                                        value={profile.socialLinks.portfolio}
                                        onChange={handleSocialChange}
                                        placeholder="https://yourportfolio.com"
                                    />

                                    <Input
                                        label="X / Twitter"
                                        name="twitter"
                                        value={profile.socialLinks.twitter}
                                        onChange={handleSocialChange}
                                        placeholder="https://x.com/username"
                                    />

                                </div>

                            </EditorCard>

                        )}


                        {/* CODING */}
                        {activeSection === "coding" && (

                            <EditorCard
                                title="Coding Profiles"
                                description="Add your coding profiles so HireReady AI can understand your problem-solving experience."
                            >

                                <div className="space-y-5">

                                    <Input
                                        label="LeetCode"
                                        name="leetcode"
                                        value={profile.codingProfiles.leetcode}
                                        onChange={handleCodingChange}
                                        placeholder="https://leetcode.com/username"
                                    />

                                    <Input
                                        label="GeeksforGeeks"
                                        name="geeksforgeeks"
                                        value={profile.codingProfiles.geeksforgeeks}
                                        onChange={handleCodingChange}
                                        placeholder="https://www.geeksforgeeks.org/user/username"
                                    />

                                    <Input
                                        label="CodeChef"
                                        name="codechef"
                                        value={profile.codingProfiles.codechef}
                                        onChange={handleCodingChange}
                                        placeholder="https://www.codechef.com/users/username"
                                    />

                                    <Input
                                        label="Codeforces"
                                        name="codeforces"
                                        value={profile.codingProfiles.codeforces}
                                        onChange={handleCodingChange}
                                        placeholder="https://codeforces.com/profile/username"
                                    />

                                    <Input
                                        label="HackerRank"
                                        name="hackerrank"
                                        value={profile.codingProfiles.hackerrank}
                                        onChange={handleCodingChange}
                                        placeholder="https://hackerrank.com/profile/username"
                                    />

                                </div>

                            </EditorCard>

                        )}


                        {/* SKILLS */}
                        {activeSection === "skills" && (

                            <EditorCard
                                title="Technical Skills"
                                description="Add technologies you are comfortable working with."
                            >

                                <SkillEditor
                                    title="Programming Languages"
                                    category="languages"
                                    skills={profile.skills.languages}
                                    onAdd={addSkill}
                                    onRemove={removeSkill}
                                />

                                <SkillEditor
                                    title="Frontend"
                                    category="frontend"
                                    skills={profile.skills.frontend}
                                    onAdd={addSkill}
                                    onRemove={removeSkill}
                                />

                                <SkillEditor
                                    title="Backend"
                                    category="backend"
                                    skills={profile.skills.backend}
                                    onAdd={addSkill}
                                    onRemove={removeSkill}
                                />

                                <SkillEditor
                                    title="Databases"
                                    category="databases"
                                    skills={profile.skills.databases}
                                    onAdd={addSkill}
                                    onRemove={removeSkill}
                                />

                                <SkillEditor
                                    title="Tools & Technologies"
                                    category="tools"
                                    skills={profile.skills.tools}
                                    onAdd={addSkill}
                                    onRemove={removeSkill}
                                />

                            </EditorCard>

                        )}


                        {/* EDUCATION */}
                        {activeSection === "education" && (

                            <EditorCard
                                title="Education"
                                description="Add your academic background."
                                action={
                                    <AddButton
                                        onClick={addEducation}
                                    />
                                }
                            >

                                {profile.education.length === 0 && (
                                    <EmptyEditor
                                        title="No education added"
                                        description="Add your degree or academic background."
                                        buttonText="Add Education"
                                        onClick={addEducation}
                                    />
                                )}

                                <div className="space-y-5">

                                    {profile.education.map(
                                        (edu, index) => (

                                            <div
                                                key={index}
                                                className="rounded-xl
                                                    border
                                                    border-zinc-200
                                                    bg-zinc-50
                                                    p-5
                                                    dark:border-white/10
                                                    dark:bg-white/[0.02]"
                                            >

                                                <div className="flex justify-between mb-5">

                                                    <h3 className="font-medium">
                                                        Education {edu.order}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeEducation(index)
                                                        }
                                                        className="text-xs
                                                            text-red-600
                                                            hover:text-red-500
                                                            dark:text-red-400
                                                            dark:hover:text-red-300"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>


                                                <div className="grid md:grid-cols-2 gap-4">

                                                    <Input
                                                        label="Institution"
                                                        value={edu.institution}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "institution",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="University / College"
                                                    />

                                                    <Input
                                                        label="Degree"
                                                        value={edu.degree}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "degree",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="B.Tech"
                                                    />

                                                    <Input
                                                        label="Field of Study"
                                                        value={edu.field}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "field",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Computer Science"
                                                    />

                                                    <Input
                                                        label="Grade / CGPA"
                                                        value={edu.grade}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "grade",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="8.5 CGPA"
                                                    />

                                                    <Input
                                                        label="Start Year"
                                                        value={edu.startYear}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "startYear",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="2021"
                                                    />

                                                    <Input
                                                        label="End Year"
                                                        value={edu.endYear}
                                                        onChange={(e) =>
                                                            updateEducation(
                                                                index,
                                                                "endYear",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="2025"
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </EditorCard>

                        )}


                        {/* EXPERIENCE */}
                        {activeSection === "experience" && (

                            <EditorCard
                                title="Experience"
                                description="Showcase your professional experience."
                                action={
                                    <AddButton
                                        onClick={addExperience}
                                    />
                                }
                            >

                                {profile.experience.length === 0 && (
                                    <EmptyEditor
                                        title="No experience added"
                                        description="Add internships, jobs or freelance experience."
                                        buttonText="Add Experience"
                                        onClick={addExperience}
                                    />
                                )}

                                <div className="space-y-5">

                                    {profile.experience.map(
                                        (exp, index) => (

                                            <div
                                                key={index}
                                                className="rounded-xl
                                                    border
                                                    border-zinc-200
                                                    bg-zinc-50
                                                    p-5
                                                    dark:border-white/10
                                                    dark:bg-white/[0.02]"
                                            >

                                                <div className="flex justify-between mb-5">

                                                    <h3 className="font-medium">
                                                        Experience {exp.order}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeExperience(index)
                                                        }
                                                        className="text-xs text-red-600 dark:text-red-400"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>


                                                <div className="grid md:grid-cols-2 gap-4">

                                                    <Input
                                                        label="Company"
                                                        value={exp.company}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "company",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Company name"
                                                    />

                                                    <Input
                                                        label="Role"
                                                        value={exp.role}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "role",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Software Engineer"
                                                    />

                                                    <Input
                                                        label="Start Date"
                                                        type="date"
                                                        value={exp.startDate}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "startDate",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <Input
                                                        label="End Date"
                                                        type="date"
                                                        value={exp.endDate || ""}
                                                        disabled={exp.currentlyWorking}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "endDate",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                <label className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">

                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            exp.currentlyWorking
                                                        }
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "currentlyWorking",
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="accent-purple-600"
                                                    />

                                                    I currently work here

                                                </label>


                                                <div className="mt-4">

                                                    <TextArea
                                                        label="Description"
                                                        value={exp.description}
                                                        onChange={(e) =>
                                                            updateExperience(
                                                                index,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Describe your responsibilities, impact and achievements..."
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </EditorCard>

                        )}


                        {/* PROJECTS */}
                        {activeSection === "projects" && (

                            <EditorCard
                                title="Projects"
                                description="Your projects help HireReady AI understand your practical experience."
                                action={
                                    <AddButton
                                        onClick={addProject}
                                    />
                                }
                            >

                                {profile.projects.length === 0 && (
                                    <EmptyEditor
                                        title="No projects added"
                                        description="Add projects you have built."
                                        buttonText="Add Project"
                                        onClick={addProject}
                                    />
                                )}

                                <div className="space-y-5">

                                    {profile.projects.map((project, index) => (
                                        <ProjectEditor
                                            key={project._id || project.id || index}
                                            project={project}
                                            index={index}
                                            updateProject={updateProject}
                                            removeProject={removeProject}
                                        />
                                    ))}

                                </div>

                            </EditorCard>

                        )}


                        {/* ACHIEVEMENTS */}
                        {activeSection === "achievements" && (

                            <EditorCard
                                title="Achievements"
                                description="Highlight achievements that make your profile stand out."
                                action={
                                    <AddButton
                                        onClick={addAchievement}
                                    />
                                }
                            >

                                {profile.achievements.length === 0 && (
                                    <EmptyEditor
                                        title="No achievements added"
                                        description="Add hackathons, awards, certifications or other achievements."
                                        buttonText="Add Achievement"
                                        onClick={addAchievement}
                                    />
                                )}

                                <div className="space-y-5">

                                    {profile.achievements.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="rounded-xl
                                                    border
                                                    border-zinc-200
                                                    bg-zinc-50
                                                    p-5
                                                    dark:border-white/10
                                                    dark:bg-white/[0.02]"
                                            >

                                                <div className="flex justify-between mb-5">

                                                    <h3 className="font-medium">
                                                        Achievement {item.order}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeAchievement(index)
                                                        }
                                                        className="text-xs text-red-600 dark:text-red-400"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>


                                                <div className="grid md:grid-cols-2 gap-4">

                                                    <Input
                                                        label="Title"
                                                        value={item.title}
                                                        onChange={(e) =>
                                                            updateAchievement(
                                                                index,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Hackathon Winner"
                                                    />

                                                    <Input
                                                        label="Date"
                                                        type="date"
                                                        value={item.date || ""}
                                                        onChange={(e) =>
                                                            updateAchievement(
                                                                index,
                                                                "date",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                </div>


                                                <div className="mt-4">

                                                    <TextArea
                                                        label="Description"
                                                        value={item.description}
                                                        onChange={(e) =>
                                                            updateAchievement(
                                                                index,
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Describe your achievement..."
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </EditorCard>

                        )}


                        {/* SAVE MESSAGE */}
                        {(message || error) && (

                            <div
                                className={`mt-5 rounded-xl border p-4 text-sm ${
                                    error
                                        ? "border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400"
                                        : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400"
                                }`}
                            >
                                {error || message}
                            </div>

                        )}

                    </div>

                </div>

            </main>
        </PageShell>
    );
};


/* =========================================================
   COMPONENTS
========================================================= */


const SectionButton = ({
    active,
    onClick,
    icon: Icon,
    label,
}) => (

    <button
        onClick={onClick}
        className={`mb-1 flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition ${
            active
                ? "border-violet-600 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-300"
                : "border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
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
        <span>{label}</span>
    </button>
);


const EditorCard = ({
    title,
    description,
    action,
    children,
}) => (

    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
        <div className="flex flex-col gap-4 border-b border-zinc-200 bg-zinc-50/80 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7 dark:border-white/10 dark:bg-zinc-950/40">
            <div>
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
            </div>
            {action}
        </div>
        <div className="p-6 md:p-7">
            {children}
        </div>
    </section>
);


const Input = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
}) => (

    <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
        />
    </div>
);


const TextArea = ({
    label,
    name,
    value,
    onChange,
    placeholder,
}) => (

    <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
        </label>
        <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            rows={5}
            placeholder={placeholder}
            className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
        />
    </div>
);


const SkillEditor = ({
    title,
    category,
    skills,
    onAdd,
    onRemove,
}) => {

    const [value, setValue] = useState("");

    const handleAdd = () => {
        onAdd(category, value);
        setValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="mb-7 last:mb-0">
            <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {title}
            </label>

            <div className="flex gap-2">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Add ${title.toLowerCase()}...`}
                    className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-violet-500 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
                />
                <button
                    onClick={handleAdd}
                    className="rounded-xl border border-violet-200 bg-violet-50 px-5 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
                >
                    Add
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm text-violet-700 dark:border-violet-500/10 dark:bg-violet-500/10 dark:text-violet-300"
                    >
                        {skill}
                        <button
                            onClick={() => onRemove(category, skill)}
                            className="text-violet-500 hover:text-red-500"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};


const AddButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
    >
        <Plus size={14} />
        Add
    </button>
);


const EmptyEditor = ({
    title,
    description,
    buttonText,
    onClick,
}) => (

    <div className="rounded-xl border border-dashed border-zinc-300 py-14 text-center dark:border-white/10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Plus size={20} />
        </div>
        <h3 className="mt-4 font-medium text-zinc-950 dark:text-white">
            {title}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
            {description}
        </p>
        <button
            onClick={onClick}
            className="mt-5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
        >
            {buttonText}
        </button>
    </div>
);


const ProjectEditor = ({
    project,
    index,
    updateProject,
    removeProject,
}) => (

    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mb-5 flex justify-between">
            <h3 className="font-medium text-zinc-950 dark:text-white">
                Project {project.order}
            </h3>
            <button
                onClick={() => removeProject(index)}
                className="text-xs text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
                Remove
            </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <Input
                label="Project Name"
                value={project.name}
                onChange={(e) =>
                    updateProject(
                        index,
                        "name",
                        e.target.value
                    )
                }
                placeholder="HireReady AI"
            />
            <Input
                label="Your Role"
                value={project.role}
                onChange={(e) =>
                    updateProject(
                        index,
                        "role",
                        e.target.value
                    )
                }
                placeholder="Full Stack Developer"
            />
            <Input
                label="GitHub URL"
                value={project.githubUrl}
                onChange={(e) =>
                    updateProject(
                        index,
                        "githubUrl",
                        e.target.value
                    )
                }
                placeholder="https://github.com/..."
            />
            <Input
                label="Live Project URL"
                value={project.liveUrl}
                onChange={(e) =>
                    updateProject(
                        index,
                        "liveUrl",
                        e.target.value
                    )
                }
                placeholder="https://..."
            />
        </div>

        <div className="mt-4">
            <TextArea
                label="Description"
                value={project.description}
                onChange={(e) =>
                    updateProject(
                        index,
                        "description",
                        e.target.value
                    )
                }
                placeholder="Explain what you built and the problem it solves..."
            />
        </div>
    </div>
);


export default UpdateProfile;