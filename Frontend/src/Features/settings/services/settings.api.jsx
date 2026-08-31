import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getSettings(){
    const response=await api.get(
        "/api/v1/settings",
    )

    return response.data;
}

export async function updateSettings(settings){
    const response=await api.patch(
        "/api/v1/settings",
        settings
    )

    return response.data;
}