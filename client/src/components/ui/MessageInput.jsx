import { SendHorizonal } from "lucide-react"
import { socket } from "../../lib/socket"
import { useState } from "react"
import { useEffect } from "react"

export default function MessageInput({ channelId }) {

    const [text, setText] = useState("")

    function handleSendMessage() {
        socket.emit("message:send", { channelId, text })
        setText("")
    }

    useEffect(() => {
        if (!text) return;

        const timer = setTimeout(() => {
            socket.emit("typing:start", channelId)
        }, 500);

        return () => {
            clearTimeout(timer)
            socket.off("typing:stop", channelId)
        }
    }, [text]);

    return (
        <div className='absolute w-full left-0 bottom-0 bg-bg-grey border-t border-bg-light p-4 flex items-center gap-4'>
            <input
                className='w-full border-none outline-none text-sm px-2'
                placeholder='Send Message...'
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />

            <button onClick={handleSendMessage} className="bg-primary-light py-2 px-4 rounded-md">
                <SendHorizonal className="text-bg-grey" size={24} />
            </button>
        </div>
    )
}
