import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { updateProfile } from "../services/profile.api";

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
            <div className="min-h-screen bg-[#08090d]
                flex items-center justify-center text-white">

                Loading...

            </div>
        );

    }


    return (
        <div className="min-h-screen bg-[#08090d] text-white">

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div
                    className="absolute top-[-200px] left-[20%]
                    w-[500px] h-[500px]
                    bg-purple-600/10
                    blur-[150px]
                    rounded-full"
                />

                <div
                    className="absolute bottom-[-200px] right-[5%]
                    w-[500px] h-[500px]
                    bg-violet-600/10
                    blur-[150px]
                    rounded-full"
                />

            </div>


            <main className="relative max-w-7xl mx-auto
                px-5 md:px-8 py-8">


                {/* Header */}
                <div className="flex flex-col md:flex-row
                    md:items-center md:justify-between
                    gap-5 mb-8">

                    <div>

                        <button
                            onClick={() => navigate("/profile")}
                            className="text-sm text-gray-500
                                hover:text-white transition mb-3"
                        >
                            ← Back to Profile
                        </button>

                        <h1 className="text-3xl md:text-4xl
                            font-bold tracking-tight">
                            Edit Profile
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Build a stronger professional profile
                            for better AI recommendations.
                        </p>

                    </div>


                    <div className="flex gap-3">

                        <button
                            onClick={() => navigate("/profile")}
                            className="px-5 py-3 rounded-xl
                                border border-white/[0.08]
                                text-gray-400
                                hover:text-white
                                hover:bg-white/[0.04]
                                transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-3 rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                to-purple-600
                                hover:from-violet-500
                                hover:to-purple-500
                                shadow-lg
                                shadow-purple-900/20
                                transition
                                disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </div>


                {/* Main layout */}
                <div className="grid lg:grid-cols-[240px_1fr]
                    gap-6">


                    {/* LEFT NAVIGATION */}
                    <aside className="lg:sticky lg:top-6
                        h-fit">

                        <div className="rounded-2xl
                            border border-white/[0.07]
                            bg-[#0e1017]
                            p-3">

                            <SectionButton
                                active={activeSection === "personal"}
                                onClick={() =>
                                    setActiveSection("personal")
                                }
                                icon="◎"
                                label="Personal Info"
                            />

                            <SectionButton
                                active={activeSection === "social"}
                                onClick={() =>
                                    setActiveSection("social")
                                }
                                icon="↗"
                                label="Social Links"
                            />

                            <SectionButton
                                active={activeSection === "coding"}
                                onClick={() =>
                                    setActiveSection("coding")
                                }
                                icon="<>"
                                label="Coding Profiles"
                            />

                            <SectionButton
                                active={activeSection === "skills"}
                                onClick={() =>
                                    setActiveSection("skills")
                                }
                                icon="✦"
                                label="Skills"
                            />

                            <SectionButton
                                active={activeSection === "education"}
                                onClick={() =>
                                    setActiveSection("education")
                                }
                                icon="▤"
                                label="Education"
                            />

                            <SectionButton
                                active={activeSection === "experience"}
                                onClick={() =>
                                    setActiveSection("experience")
                                }
                                icon="◫"
                                label="Experience"
                            />

                            <SectionButton
                                active={activeSection === "projects"}
                                onClick={() =>
                                    setActiveSection("projects")
                                }
                                icon="▣"
                                label="Projects"
                            />

                            <SectionButton
                                active={activeSection === "achievements"}
                                onClick={() =>
                                    setActiveSection("achievements")
                                }
                                icon="★"
                                label="Achievements"
                            />

                        </div>


                        {/* Completion card */}
                        <div className="rounded-2xl
                            border border-purple-500/20
                            bg-gradient-to-br
                            from-purple-900/20
                            to-transparent
                            p-5 mt-4">

                            <div className="flex justify-between">

                                <div>
                                    <p className="text-sm font-medium">
                                        Profile Strength
                                    </p>

                                    <p className="text-xs
                                        text-gray-500 mt-1">
                                        Keep improving your profile
                                    </p>
                                </div>

                                <span className="text-purple-400
                                    font-bold">
                                    {completion}%
                                </span>

                            </div>


                            <div className="h-2 bg-white/[0.06]
                                rounded-full mt-4 overflow-hidden">

                                <div
                                    className="h-full
                                        bg-gradient-to-r
                                        from-violet-600
                                        to-purple-400
                                        rounded-full
                                        transition-all"
                                    style={{
                                        width: `${completion}%`,
                                    }}
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
                                                    border-white/[0.07]
                                                    bg-white/[0.02]
                                                    p-5"
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
                                                            text-red-400
                                                            hover:text-red-300"
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
                                                    border-white/[0.07]
                                                    bg-white/[0.02]
                                                    p-5"
                                            >

                                                <div className="flex justify-between mb-5">

                                                    <h3 className="font-medium">
                                                        Experience {exp.order}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeExperience(index)
                                                        }
                                                        className="text-xs
                                                            text-red-400"
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


                                                <label className="flex items-center gap-2 mt-4 text-sm text-gray-400">

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
                                                    border-white/[0.07]
                                                    bg-white/[0.02]
                                                    p-5"
                                            >

                                                <div className="flex justify-between mb-5">

                                                    <h3 className="font-medium">
                                                        Achievement {item.order}
                                                    </h3>

                                                    <button
                                                        onClick={() =>
                                                            removeAchievement(index)
                                                        }
                                                        className="text-xs
                                                            text-red-400"
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
                                        ? "border-red-500/20 bg-red-500/5 text-red-400"
                                        : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                                }`}
                            >
                                {error || message}
                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
};


/* =========================================================
   COMPONENTS
========================================================= */


const SectionButton = ({
    active,
    onClick,
    icon,
    label,
}) => (

    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3
            px-4 py-3 rounded-xl mb-1
            text-sm transition ${
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


const EditorCard = ({
    title,
    description,
    action,
    children,
}) => (

    <section className="rounded-2xl
        border border-white/[0.07]
        bg-[#0e1017]
        overflow-hidden">

        <div className="p-6 md:p-7
            border-b border-white/[0.06]
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-4">

            <div>

                <h2 className="text-xl font-semibold">
                    {title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
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

        <label className="block text-sm
            font-medium text-gray-300 mb-2">
            {label}
        </label>

        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full px-4 py-3
                rounded-xl
                bg-[#090b10]
                border border-white/[0.08]
                text-white
                placeholder:text-gray-700
                outline-none
                focus:border-purple-500/50
                focus:ring-2
                focus:ring-purple-500/10
                transition
                disabled:opacity-40"
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

        <label className="block text-sm
            font-medium text-gray-300 mb-2">
            {label}
        </label>

        <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            rows={5}
            placeholder={placeholder}
            className="w-full px-4 py-3
                rounded-xl
                bg-[#090b10]
                border border-white/[0.08]
                text-white
                placeholder:text-gray-700
                outline-none
                resize-none
                focus:border-purple-500/50
                focus:ring-2
                focus:ring-purple-500/10
                transition"
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

            <label className="block text-sm
                font-medium text-gray-300 mb-3">
                {title}
            </label>

            <div className="flex gap-2">

                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Add ${title.toLowerCase()}...`}
                    className="flex-1 px-4 py-3
                        rounded-xl
                        bg-[#090b10]
                        border border-white/[0.08]
                        text-white
                        placeholder:text-gray-700
                        outline-none
                        focus:border-purple-500/50"
                />

                <button
                    onClick={handleAdd}
                    className="px-5 rounded-xl
                        bg-purple-600/15
                        border border-purple-500/20
                        text-purple-400
                        hover:bg-purple-600/25
                        transition"
                >
                    Add
                </button>

            </div>


            <div className="flex flex-wrap gap-2 mt-4">

                {skills.map((skill, index) => (

                    <span
                        key={index}
                        className="flex items-center gap-2
                            px-3 py-1.5
                            rounded-lg
                            bg-purple-500/10
                            border border-purple-500/10
                            text-sm text-purple-300"
                    >

                        {skill}

                        <button
                            onClick={() =>
                                onRemove(category, skill)
                            }
                            className="text-purple-500
                                hover:text-red-400"
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
        className="px-4 py-2 rounded-lg
            bg-purple-500/10
            border border-purple-500/20
            text-purple-400
            text-sm
            hover:bg-purple-500/20
            transition"
    >
        + Add
    </button>

);


const EmptyEditor = ({
    title,
    description,
    buttonText,
    onClick,
}) => (

    <div className="py-14 text-center
        rounded-xl
        border border-dashed
        border-white/[0.08]">

        <div className="w-12 h-12 mx-auto
            rounded-xl
            bg-purple-500/10
            flex items-center justify-center
            text-purple-400 text-xl">
            +
        </div>

        <h3 className="font-medium mt-4">
            {title}
        </h3>

        <p className="text-sm text-gray-600
            max-w-sm mx-auto mt-2">
            {description}
        </p>

        <button
            onClick={onClick}
            className="mt-5 px-4 py-2 rounded-lg
                bg-purple-600
                hover:bg-purple-500
                text-sm transition"
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

    <div className="rounded-xl
        border border-white/[0.07]
        bg-white/[0.02]
        p-5">

        <div className="flex justify-between mb-5">

            <h3 className="font-medium">
                Project {project.order}
            </h3>

            <button
                onClick={() => removeProject(index)}
                className="text-xs text-red-400
                    hover:text-red-300"
            >
                Remove
            </button>

        </div>


        <div className="grid md:grid-cols-2 gap-4">

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