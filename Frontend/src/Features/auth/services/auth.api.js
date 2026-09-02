import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.post("/api/auth/logout");

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        // 401 simply means user is not logged in
        if (error.response?.status === 401) {
            return null;
        }

        throw error;
    }
}

export async function forgotPassword({ email }) {
    try {
        const response = await api.post("/api/auth/forgot-password", {
            email,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function resetPassword({ token, password }) {
    try {
        const response = await api.post(
            `/api/auth/reset-password/${token}`,
            {
                password,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function changePassword({ currentPassword, newPassword }) {
    try {
        const response = await api.post(
            "/api/auth/change-password",
            {
                currentPassword,
                newPassword,
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}