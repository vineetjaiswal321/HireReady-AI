import AppNavbar from "./AppNavbar.jsx";

const PageShell = ({ children, variant = "app" }) => {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#F7F7F8] text-zinc-950 antialiased dark:bg-[#09090B] dark:text-zinc-50">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute left-1/2 top-[-360px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-500/[0.12] blur-[120px] dark:bg-violet-600/[0.16]" />
                <div
                    className="absolute inset-0 opacity-[0.45] dark:opacity-[0.22]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--hr-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hr-grid) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
            </div>

            <AppNavbar variant={variant} />
            {children}
        </div>
    );
};

export default PageShell;
