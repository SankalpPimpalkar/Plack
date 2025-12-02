import { useParams } from "react-router-dom"

export default function ChatWindow({ channelId }) {
    console.log("CHANNEL ID", channelId)

    return (
        <div className="w-full min-h-dvh bg-primary-dark text-amber-50 h-full col-span-3">
            ChatWindow
        </div>
    )
}
