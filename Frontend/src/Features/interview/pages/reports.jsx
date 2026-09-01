import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    FileText,
    Trash2,
    BriefcaseBusiness,
    ArrowRight,
    Download,
    CalendarDays,
    Target,
    TrendingUp,
    Sparkles,
    SlidersHorizontal,
    Loader2,
} from "lucide-react";

import { useInterview } from "../../hooks/useInterview.hooks.js";
import PageShell from "../../layout/PageShell.jsx";

const Reports = () => {
    const navigate = useNavigate();

    const {
        reports: reportsData,
        loading,
        generateResume,
        handleDeleteReport,
    } = useInterview();

    const reports = reportsData ?? [];
    const [search, setSearch] = useState("");
    const [scoreFilter, setScoreFilter] = useState("all");

    const [deleteReportId, setDeleteReportId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const [selectedPdf, setSelectedPdf] = useState(null);

    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const title = report.title?.toLowerCase() || "";

            const matchesSearch = title.includes(search.toLowerCase());

            let matchesScore = true;

            if (scoreFilter === "excellent") {
                matchesScore = report.matchScore >= 80;
            }

            if (scoreFilter === "good") {
                matchesScore = report.matchScore >= 60 && report.matchScore < 80;
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
                  reports.reduce((sum, report) => sum + (report.matchScore || 0), 0) /
                      reports.length
              )
            : 0;

    const bestScore =
        reports.length > 0 ? Math.max(...reports.map((report) => report.matchScore || 0)) : 0;

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
            <PageShell>
                <div className="relative mx-auto max-w-7xl px-5 py-10">
                    <div className="mb-10 flex items-center gap-3 text-sm text-zinc-500">
                        <Loader2 className="h-4 w-4 animate-spin text-violet-600 dark:text-violet-400" />
                        Loading reports...
                    </div>
                    <div className="animate-pulse">
                        <div className="mb-3 h-10 w-72 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="mb-10 h-5 w-96 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-32 rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900"
                                />
                            ))}
                        </div>
                        <div className="mb-6 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-900" />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-64 rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PageShell>
        );
    }

    const handleConfirmDelete = async () => {
        try {
            setDeleting(true);
            await handleDeleteReport(deleteReportId);
            setDeleteReportId(null);
        } catch (error) {
            console.error("Failed to delete report:", error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <PageShell>
            <main className="relative mx-auto max-w-7xl px-5 py-10 md:px-6">
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <Sparkles size={14} className="text-violet-600 dark:text-violet-400" />
                            <span className="text-xs font-semibold tracking-[0.18em] text-violet-700 dark:text-violet-400">
                                CAREER INTELLIGENCE
                            </span>
                        </div>

                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl dark:text-white">
                            Interview Reports
                        </h1>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Review your previous interview analyses and preparation plans.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
                    >
                        <Sparkles size={16} />
                        New Interview
                    </button>
                </div>

                {deleteReportId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm dark:bg-black/50">
                        <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#111113]">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <Trash2 size={22} />
                            </div>

                            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                                Delete report?
                            </h2>

                            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Are you sure you want to delete this interview report? This action cannot
                                be undone.
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteReportId(null)}
                                    disabled={deleting}
                                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={deleting}
                                    className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deleting ? "Deleting..." : "Delete Report"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
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
                            bestScore >= 80 ? "Strong job alignment" : "Keep improving your profile"
                        }
                    />
                </div>

                <div className="mb-7 flex flex-col gap-3 md:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by job title..."
                            className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 dark:border-white/10 dark:bg-[#111113] dark:text-white dark:placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="relative">
                        <SlidersHorizontal
                            size={17}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <select
                            value={scoreFilter}
                            onChange={(e) => setScoreFilter(e.target.value)}
                            className="h-12 appearance-none rounded-xl border border-zinc-200 bg-white pl-10 pr-10 text-sm text-zinc-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 dark:border-white/10 dark:bg-[#111113] dark:text-zinc-300"
                        >
                            <option value="all">All Scores</option>
                            <option value="excellent">Excellent · 80%+</option>
                            <option value="good">Good · 60–79%</option>
                            <option value="low">Needs Work · Below 60%</option>
                        </select>
                    </div>
                </div>

                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        Showing{" "}
                        <span className="font-medium text-zinc-800 dark:text-zinc-300">
                            {filteredReports.length}
                        </span>{" "}
                        report
                        {filteredReports.length !== 1 && "s"}
                    </p>
                    <div className="ml-5 h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                </div>

                {filteredReports.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-200 bg-white py-20 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#111113] dark:shadow-none">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                            <FileText size={28} className="text-zinc-400" />
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-zinc-950 dark:text-white">
                            No reports found
                        </h2>
                        <p className="mx-auto mb-6 max-w-md text-sm text-zinc-500">
                            {reports.length === 0
                                ? "Generate your first interview report to start tracking your preparation."
                                : "Try changing your search or filter."}
                        </p>
                        {reports.length === 0 && (
                            <button
                                onClick={() => navigate("/")}
                                className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                            >
                                Create Interview Report
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredReports.map((report) => (
                            <ReportCard
                                key={report._id}
                                report={report}
                                formatDate={formatDate}
                                getScoreLabel={getScoreLabel}
                                onView={() => navigate(`/interview/${report._id}`)}
                                setSelectedPdf={setSelectedPdf}
                                onDelete={() => setDeleteReportId(report._id)}
                            />
                        ))}
                    </div>
                )}

                          {selectedPdf && (
            <div
                className="
                    fixed inset-0 z-50
                    bg-black/80
                    backdrop-blur-sm
                    flex items-center justify-center
                    p-4
                "
                onClick={() => setSelectedPdf(null)}
            >

                <div
                    className="
                        relative
                        w-full
                        max-w-5xl
                        h-[90vh]
                        bg-zinc-900
                        rounded-2xl
                        overflow-hidden
                        border border-white/10
                        shadow-2xl
                    "
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="
                        h-16
                        px-5
                        flex items-center justify-between
                        border-b border-white/10
                        bg-zinc-950
                    ">

                        <h2 className="
                            text-white
                            font-semibold
                        ">
                            Resume Preview
                        </h2>


                        <div className="flex items-center gap-3">

                            {/* Download */}
                            <a
                                href={selectedPdf}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    px-4 py-2
                                    rounded-xl
                                    bg-violet-500
                                    hover:bg-violet-600
                                    text-white
                                    text-sm
                                    font-medium
                                    transition
                                "
                            >
                                Download PDF
                            </a>


                            {/* Close */}
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="
                                    w-10 h-10
                                    rounded-xl
                                    bg-white/5
                                    hover:bg-white/10
                                    text-zinc-300
                                    hover:text-white
                                    transition
                                "
                            >
                                ✕
                            </button>

                        </div>

                    </div>


                    {/* PDF */}
                    <iframe
                        src={selectedPdf}
                        title="Resume PDF Preview"
                        className="
                            w-full
                            h-[calc(90vh-4rem)]
                            bg-white
                        "
                    />

                </div>

            </div>
        )}
            </main>
        </PageShell>
    
  
                

    );
};

const StatCard = ({ icon, label, value, description }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:border-zinc-300 dark:border-white/10 dark:bg-[#111113] dark:shadow-none dark:hover:border-white/20">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-zinc-500">{label}</p>
                    <p className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-white">{value}</p>
                </div>
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    {icon}
                </div>
            </div>
            <p className="mt-3 text-xs text-zinc-500">{description}</p>
        </div>
    );
};

const ReportCard = ({ report, formatDate, getScoreLabel, onView, setSelectedPdf , onDelete }) => {
    const score = report.matchScore || 0;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-zinc-300 dark:border-white/10 dark:bg-[#111113] dark:shadow-none dark:hover:border-white/20">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-80" />

            <div className="p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10">
                            <BriefcaseBusiness size={20} className="text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-zinc-950 dark:text-white">
                                {report.title || "Interview Report"}
                            </h3>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                                <CalendarDays size={13} />
                                {formatDate(report.createdAt)}
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 text-right">
                        <div className="text-2xl font-semibold text-zinc-950 dark:text-white">{score}%</div>
                        <div className="text-[11px] text-zinc-500">Match</div>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-violet-600 transition-all"
                            style={{ width: `${Math.min(score, 100)}%` }}
                        />
                    </div>
                    <div className="mt-2 flex justify-between">
                        <span className="text-xs text-zinc-500">Job compatibility</span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">{getScoreLabel(score)}</span>
                    </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-2">
                    <InfoItem label="Experience" value={report.experienceLevel || "Entry Level"} />
                    <InfoItem label="Interview" value={report.interviewType || "Technical"} />
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={onView}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-medium text-white transition hover:bg-violet-500"
                    >
                        View
                        <ArrowRight size={15} />
                    </button>

                    {report.pdf?.url && (
                    <button
                        onClick={() => setSelectedPdf(report.pdf.url)}
                        className="
                            px-4 py-2
                            rounded-xl
                            bg-violet-500/10
                            border border-violet-500/20
                            text-violet-400
                            hover:bg-violet-500/20
                            transition
                        "
                    >
                        View PDF
                    </button>
                )}

                    <button
                        onClick={onDelete}
                        className="flex h-11 items-center justify-center gap-1 rounded-xl border border-red-200 bg-red-50 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value }) => {
    return (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-zinc-950/70">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p>
            <p className="mt-1 truncate text-xs capitalize text-zinc-700 dark:text-zinc-300">{value}</p>
        </div>
    );
};

export default Reports;
