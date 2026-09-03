import axios from "axios"

const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function updateProfile(profileData){
    try {
        const respone=await api.put(
            "/api/users/profile",
            profileData
        )
        
        return respone.data
    } catch (error) {
        throw error
    }
}
