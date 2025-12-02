import { useParams } from "react-router-dom"
import MessageInput from "./ui/MessageInput"
import ChannelHeader from "./ui/ChannelHeader"
import Messages from "./ui/Messages"
import { useEffect } from "react"
import { useState } from "react"
import { getChannelDetails } from "../lib/api"
import { socket } from "../lib/socket"

export default function ChatWindow({ channelId }) {

    const [channelDetails, setChannelDetails] = useState(null)
    const [messages, setmessages] = useState([])

    useEffect(() => {
        socket.emit("channel:join", channelId)
    }, [socket])

    useEffect(() => {
        (async () => {
            if (channelId) {
                const response = await getChannelDetails({ channelId })
                console.log("Channel Details", response)
                setChannelDetails(response.channel)
                setmessages(response.messages)
            }
        })()
    }, [channelId])

    useEffect(() => {
        if (!socket) return;

        const handler = (messageData) => {
            setmessages((prev) => [...prev, messageData]);
        };

        socket.on("message:new", handler);

        return () => {
            socket.off("message:new", handler);
        };
    }, [socket])

    return (
        <div className="w-full h-screen bg-bg-dark text-amber-50 col-span-5 relative">
            <ChannelHeader channelDetails={channelDetails} />
            <Messages messagesData={messages} />
            <MessageInput channelId={channelDetails?._id} />
        </div>
    )
}
