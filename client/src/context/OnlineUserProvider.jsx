import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../lib/socket";
import { useContext, createContext } from "react";
import { getInitialOnlineUsers } from "../lib/api";

const OnlineUserContext = createContext({
    onlineUsers: []
})

export default function OnlineUserContextProvider({ children }) {

    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        socket.on("presence:online", ({ userId }) => {
            setOnlineUsers((prev) => [...prev, userId])
        })

        return () => socket.off("presence:online", ({ userId }) => {
            setOnlineUsers((prev) => [...prev, userId])
        })
    }, [socket])

    useEffect(() => {
        (async () => {
            const response = await getInitialOnlineUsers()
            setOnlineUsers(response.online)
        })()
    }, [])

    return (
        <OnlineUserContext.Provider value={{ onlineUsers }}>
            {children}
        </OnlineUserContext.Provider>
    )
}

export const useOnlineUser = () => useContext(OnlineUserContext)