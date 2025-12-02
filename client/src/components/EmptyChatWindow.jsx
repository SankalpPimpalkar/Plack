import React from 'react'
import { MessageCircleQuestion } from "lucide-react"

export default function EmptyChatWindow() {
    return (
        <div className='bg-bg-dark w-full min-h-dvh flex flex-col items-center justify-center gap-5 col-span-5'>
            <MessageCircleQuestion size={32} className='text-amber-50' />
            <p className='text-center text-amber-50 w-full max-w-sm text-sm'>
                Select a channel from the sidebar to start chatting. All conversations will appear here.
            </p>
        </div>
    )
}
