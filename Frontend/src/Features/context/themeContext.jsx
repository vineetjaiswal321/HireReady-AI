import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "Dark"
    );


    useEffect(() => {

        const root = document.documentElement;

        const applyTheme = () => {

            root.classList.remove("dark", "light");


            if (theme === "Dark") {

                root.classList.add("dark");

            }

            else if (theme === "Light") {

                root.classList.add("light");

            }

            else if (theme === "System") {

                const systemTheme =
                    window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches
                        ? "dark"
                        : "light";

                root.classList.add(systemTheme);
            }
        };


        applyTheme();


        // Save selected theme locally
        localStorage.setItem(
            "theme",
            theme
        );


        // Listen for system theme changes
        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


        const handleSystemThemeChange = () => {

            if (theme === "System") {
                applyTheme();
            }

        };


        mediaQuery.addEventListener(
            "change",
            handleSystemThemeChange
        );


        return () => {

            mediaQuery.removeEventListener(
                "change",
                handleSystemThemeChange
            );

        };

    }, [theme]);


    return (

        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >

            {children}

        </ThemeContext.Provider>

    );
};


export const useTheme = () => {

    const context = useContext(ThemeContext);


    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );

    }


    return context;

};