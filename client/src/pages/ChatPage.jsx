import { Routes, Route, useParams } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import EmptyChatWindow from "../components/EmptyChatWindow"
import ChatWindow from "../components/ChatWindow"
import Sidebar from "../components/Sidebar"

export default function ChatPage() {

    const { channelId } = useParams()
    const isMobile = useMediaQuery({ maxWidth: 767 });

    if (isMobile) {
        if (!channelId) return <Sidebar />;
        return <ChatWindow channelId={channelId} />;
    }

    return (
        <div className="w-full min-h-dvh h-full grid grid-cols-5">
            <Sidebar />
            {
                channelId ? <ChatWindow /> : <EmptyChatWindow />
            }
        </div>
    )
}
