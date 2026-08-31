import axios from "axios"

const api=axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export async function register({username, email, password}) {
    try {

        const response=await api.post('/api/auth/register',{
            username, email, password
        })
        // {
        //     withCredentials:true //by default axios do not allow backend server to access the frontend cokkie but by using withcreadintials : true, it allow the server to access the frontend cokiee and modify or use them
        // }
        return response.data;
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function login({email, password}) {
    try {
        const response=await api.post('/api/auth/login', {
            email, password
        })

        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function logout() {
    try {
        const response=await api.post("/api/auth/logout")

        return response.data;
    } catch (error) {
        console.log(error)
        throw error
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

        console.error("Get Me Error:", error);
        throw error;
    }
}