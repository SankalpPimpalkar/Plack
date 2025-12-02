import React from 'react';

export default function MessageBubble({ messageData, isOwnMessage }) {
    const alignmentClass = isOwnMessage
        ? 'flex-row-reverse text-right'
        : 'flex-row text-left';

    return (
        <section className={`flex ${alignmentClass} items-start gap-4`}>
            <img
                className="h-10 w-10 rounded-full"
                src={messageData?.sender?.imageUrl}
                alt={messageData?.sender?.name}
            />

            <div className="flex flex-col items-start gap-1">
                <h4 className={`text-sm ${isOwnMessage && "place-self-end"} font-semibold text-muted`}>
                    {messageData?.sender?.name}
                </h4>
                <p className="max-w-lg text-sm font-medium bg-primary-light text-amber-50 p-4 rounded">
                    {messageData?.text}
                </p>
            </div>
        </section>
    );
}
