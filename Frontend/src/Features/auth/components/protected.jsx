import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";
import { Loader2 } from "lucide-react";


const Protected = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F7F8] dark:bg-[#09090B]">
                <Loader2
                    size={42}
                    strokeWidth={2.5}
                    className="animate-spin text-violet-600 dark:text-violet-400"
                />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;