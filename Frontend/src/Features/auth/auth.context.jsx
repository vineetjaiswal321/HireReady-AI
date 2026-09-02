import { createContext, useEffect, useState } from "react";
import { getMe, logout as logoutApi } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();

                if (data) {
                    setUser(data.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    const logout = async () => {
        try {
            await logoutApi();
            setUser(null);
        } catch (error) {
            // Silently handle logout errors
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};