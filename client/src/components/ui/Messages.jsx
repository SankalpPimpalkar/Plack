import React from 'react'
import MessageBubble from './MessageBubble'
import { useUser } from '@clerk/clerk-react'
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Messages({ messagesData = [] }) {

    const { user } = useUser()
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!bottomRef.current) return;

        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messagesData]);

    if (messagesData.length == 0) {
        return (
            <p className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-muted'>
                No Messages Yet
            </p>
        )
    }

    return (
        <div className='absolute top-0 left-0 w-full h-full py-24 px-5 flex flex-col gap-8 overflow-y-auto z-0'>
            {
                messagesData.map((message) => (
                    <MessageBubble
                        messageData={message}
                        isOwnMessage={message?.sender.clerkId == user.id}
                    />
                ))
            }

            <div ref={bottomRef}></div>
        </div>
    )
}
