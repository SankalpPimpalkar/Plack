import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export async function checkHealth() {
    try {
        const response = await api.get("/api/health")
        console.log("checkHealth", response.data)
        return response.data

    } catch (error) {
        console.log("Error in checkHealth", error)
        throw new Error(error)
    }
}

export async function getUserChannels() {
    try {
        const response = await api.get("/api/channels/me")
        console.log("User Channels", response.data)
        return response.data

    } catch (error) {
        console.log("Error in getUserChannels", error)
        throw new Error(error)
    }
}

export async function createChannel({ name, description }) {
    try {
        const response = await api.post("/api/channels/new", {
            name,
            description
        })

        return response.data

    } catch (error) {
        console.log("Error in creating a channel", error)
        throw new Error(error)
    }
}

export async function getChannelDetails({ channelId }) {
    try {
        console.log("CHANNEL ID", channelId)
        const response = await api.get(`/api/channels/${String(channelId)}`)
        return response.data

    } catch (error) {
        console.log("Error in getting channel details", error)
        throw new Error(error)
    }
}

export async function getAvailableChannels() {
    try {
        const response = await api.get('/api/channels')
        return response.data

    } catch (error) {
        console.log("Error in getting available channels", error)
        throw new Error(error)
    }
}

export async function joinChannel({channelId}) {
    try {
        const response = await api.patch(`/api/channels/${channelId}/join`)
        return response.data

    } catch (error) {
        console.log("Error in joining channel", error)
        throw new Error(error)
    }
}

export async function leaveChannel({channelId}) {
    try {
        const response = await api.patch(`/api/channels/${channelId}/leave`)
        return response.data

    } catch (error) {
        console.log("Error in leaving channel", error)
        throw new Error(error)
    }
}

export async function getInitialOnlineUsers() {
    try {
        const response = await api.get('/api/online-users')
        return response.data

    } catch (error) {
        console.log("Error in leaving channel", error)
        throw new Error(error)
    }
}
