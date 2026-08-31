import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    FileText,
    BriefcaseBusiness,
    ArrowRight,
    Download,
    CalendarDays,
    Target,
    TrendingUp,
    Sparkles,
    SlidersHorizontal,
} from "lucide-react";

import { useInterview } from "../../hooks/useInterview.hooks.js";


const Reports = () => {
    const navigate = useNavigate();

    const {
        reports: reportsData,
        loading,
        generateResume
    } = useInterview();



    const reports = reportsData ?? [];
    console.log("REPORTS PAGE:", reports);
    const [search, setSearch] = useState("");
    const [scoreFilter, setScoreFilter] = useState("all");

    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const title = report.title?.toLowerCase() || "";

            const matchesSearch = title.includes(search.toLowerCase());

            let matchesScore = true;

            if (scoreFilter === "excellent") {
                matchesScore = report.matchScore >= 80;
            }

            if (scoreFilter === "good") {
                matchesScore =
                    report.matchScore >= 60 &&
                    report.matchScore < 80;
            }

            if (scoreFilter === "low") {
                matchesScore = report.matchScore < 60;
            }

            return matchesSearch && matchesScore;
        });
    }, [reports, search, scoreFilter]);

    const averageScore =
        reports.length > 0
            ? Math.round(
                  reports.reduce(
                      (sum, report) => sum + (report.matchScore || 0),
                      0
                  ) / reports.length
              )
            : 0;

    const bestScore =
        reports.length > 0
            ? Math.max(
                  ...reports.map((report) => report.matchScore || 0)
              )
            : 0;

    const formatDate = (date) => {
        if (!date) return "Unknown date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        return "Needs Work";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] text-white p-6">
                <div className="max-w-7xl mx-auto animate-pulse">

                    <div className="h-10 w-72 bg-zinc-800 rounded-lg mb-3" />
                    <div className="h-5 w-96 bg-zinc-800 rounded-lg mb-10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 bg-zinc-900 border border-zinc-800 rounded-2xl"
                            />
                        ))}
                    </div>

                    <div className="h-14 bg-zinc-900 rounded-xl mb-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white">

            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-200px] left-[20%] w-[500px] h-[500px] bg-violet-600/10 blur-[140px] rounded-full" />
                <div className="absolute top-[30%] right-[-200px] w-[450px] h-[450px] bg-blue-600/10 blur-[140px] rounded-full" />
            </div>

            <main className="relative max-w-7xl mx-auto px-5 py-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                                <Sparkles
                                    size={18}
                                    className="text-violet-400"
                                />
                            </div>

                            <span className="text-sm text-violet-400 font-medium">
                                Career Intelligence
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Interview Reports
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            Review your previous interview analyses and
                            preparation plans.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
                    >
                        <Sparkles size={17} />
                        New Interview
                    </button>
                </div>


                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <StatCard
                        icon={<FileText size={20} />}
                        label="Total Reports"
                        value={reports.length}
                        description="Interview analyses generated"
                    />

                    <StatCard
                        icon={<Target size={20} />}
                        label="Average Match"
                        value={`${averageScore}%`}
                        description="Across all your reports"
                    />

                    <StatCard
                        icon={<TrendingUp size={20} />}
                        label="Best Match"
                        value={`${bestScore}%`}
                        description={
                            bestScore >= 80
                                ? "Strong job alignment"
                                : "Keep improving your profile"
                        }
                    />

                </div>


                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row gap-3 mb-7">

                    <div className="relative flex-1">

                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by job title..."
                            className="w-full h-12 pl-11 pr-4 rounded-xl bg-zinc-900 border border-zinc-800 outline-none text-sm placeholder:text-zinc-600 focus:border-violet-500/60 transition"
                        />

                    </div>


                    <div className="relative">

                        <SlidersHorizontal
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />

                        <select
                            value={scoreFilter}
                            onChange={(e) =>
                                setScoreFilter(e.target.value)
                            }
                            className="h-12 pl-10 pr-10 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 outline-none focus:border-violet-500/60 appearance-none"
                        >
                            <option value="all">
                                All Scores
                            </option>

                            <option value="excellent">
                                Excellent · 80%+
                            </option>

                            <option value="good">
                                Good · 60–79%
                            </option>

                            <option value="low">
                                Needs Work · Below 60%
                            </option>
                        </select>

                    </div>

                </div>


                {/* Results count */}
                <div className="flex items-center justify-between mb-5">

                    <p className="text-sm text-zinc-500">
                        Showing{" "}
                        <span className="text-zinc-300 font-medium">
                            {filteredReports.length}
                        </span>{" "}
                        report
                        {filteredReports.length !== 1 && "s"}
                    </p>

                    <div className="h-px flex-1 bg-zinc-800 ml-5" />

                </div>


                {/* Empty state */}
                {filteredReports.length === 0 ? (
                    <div className="border border-zinc-800 bg-zinc-900/50 rounded-2xl py-20 text-center">

                        <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-5">
                            <FileText
                                size={28}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            No reports found
                        </h2>

                        <p className="text-zinc-500 max-w-md mx-auto mb-6">
                            {reports.length === 0
                                ? "Generate your first interview report to start tracking your preparation."
                                : "Try changing your search or filter."}
                        </p>

                        {reports.length === 0 && (
                            <button
                                onClick={() => navigate("/")}
                                className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-medium"
                            >
                                Create Interview Report
                            </button>
                        )}

                    </div>
                ) : (

                    /* Reports grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {filteredReports.map((report) => (

                            <ReportCard
                                key={report._id}
                                report={report}
                                formatDate={formatDate}
                                getScoreLabel={getScoreLabel}
                                onView={() =>
                                    navigate(
                                        `/interview/${report._id}`
                                    )
                                }
                                onDownload={generateResume}
                            />

                        ))}

                    </div>

                )}

            </main>
        </div>
    );
};


/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
    icon,
    label,
    value,
    description,
}) => {

    return (
        <div className="relative overflow-hidden p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-zinc-500">
                        {label}
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        {value}
                    </p>

                </div>

                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                    {icon}
                </div>

            </div>

            <p className="text-xs text-zinc-600 mt-3">
                {description}
            </p>

        </div>
    );
};


/* =====================================================
   REPORT CARD
===================================================== */

const ReportCard = ({
    report,
    formatDate,
    getScoreLabel,
    onView,
    onDownload,
}) => {

    const score = report.matchScore || 0;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">

            {/* Top gradient */}
            <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-70" />

            <div className="p-5">

                {/* Title */}
                <div className="flex items-start justify-between gap-4 mb-5">

                    <div className="flex gap-3 min-w-0">

                        <div className="shrink-0 w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                            <BriefcaseBusiness
                                size={20}
                                className="text-violet-400"
                            />
                        </div>

                        <div className="min-w-0">

                            <h3 className="font-semibold text-base truncate">
                                {report.title || "Interview Report"}
                            </h3>

                            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-500">
                                <CalendarDays size={13} />
                                {formatDate(report.createdAt)}
                            </div>

                        </div>

                    </div>


                    {/* Score */}
                    <div className="shrink-0 text-right">

                        <div className="text-2xl font-bold">
                            {score}%
                        </div>

                        <div className="text-[11px] text-zinc-500">
                            Match
                        </div>

                    </div>

                </div>


                {/* Score progress */}
                <div className="mb-5">

                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">

                        <div
                            className="h-full rounded-full bg-violet-500 transition-all"
                            style={{
                                width: `${Math.min(score, 100)}%`,
                            }}
                        />

                    </div>

                    <div className="flex justify-between mt-2">

                        <span className="text-xs text-zinc-500">
                            Job compatibility
                        </span>

                        <span className="text-xs text-zinc-400">
                            {getScoreLabel(score)}
                        </span>

                    </div>

                </div>


                {/* Meta */}
                <div className="grid grid-cols-2 gap-2 mb-5">

                    <InfoItem
                        label="Experience"
                        value={
                            report.experienceLevel ||
                            "Entry Level"
                        }
                    />

                    <InfoItem
                        label="Interview"
                        value={
                            report.interviewType ||
                            "Technical"
                        }
                    />

                </div>


                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">

                    <button
                        onClick={onView}
                        className="flex items-center justify-center gap-2 h-11 rounded-xl bg-zinc-800 hover:bg-violet-600 transition font-medium text-sm"
                    >
                        View Report

                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </button>

                    <button
                        onClick={() => onDownload(report._id)}
                        className="flex items-center justify-center gap-2 h-11 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition font-medium text-sm"
                    >
                        <Download size={16} />

                        Resume PDF
                    </button>

                </div>

            </div>
        </div>
    );
};


/* =====================================================
   INFO ITEM
===================================================== */

const InfoItem = ({ label, value }) => {

    return (
        <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/70 p-3">

            <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                {label}
            </p>

            <p className="text-xs text-zinc-300 mt-1 capitalize truncate">
                {value}
            </p>

        </div>
    );
};

export default Reports;