import { createContext, useState, useEffect } from "react";
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


    // Logout
    const logout = async () => {

        try {

            await logoutApi();

            // Clear user from frontend
            setUser(null);

        } catch (error) {

            console.error("Logout error:", error);

        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};