import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const ThemeContext = createContext();

const getSystemIsDark = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

const resolveIsDark = (theme) => {
    if (theme === "Light") return false;
    if (theme === "Dark") return true;
    return getSystemIsDark();
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "Dark"
    );
    const [isDark, setIsDark] = useState(() =>
        resolveIsDark(localStorage.getItem("theme") || "Dark")
    );

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = () => {
            const dark = resolveIsDark(theme);

            root.classList.toggle("dark", dark);
            root.classList.toggle("light", !dark);
            setIsDark(dark);
        };

        applyTheme();
        localStorage.setItem("theme", theme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => {
            if (theme === "System") applyTheme();
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            isDark,
        }),
        [theme, isDark]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
};
