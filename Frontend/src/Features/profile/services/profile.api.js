import axios from "axios"

const api=axios.create({
    baseURL: "http://localhost:3000",
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
        console.log(error)
        throw error
    }
}