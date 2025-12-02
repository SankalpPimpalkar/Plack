import { Hash } from 'lucide-react'
import { useModal } from '../../context/ModalProvider'
import ChannelDetailsModal from '../modals/ChannelDetailsModal';
import { useEffect } from 'react';
import { socket } from '../../lib/socket';
import { useState } from 'react';

export default function ChannelHeader({ channelDetails }) {

    const { openModal } = useModal()
    const [typingUsers, setTypingUsers] = useState([])

    function handleModal() {
        openModal(ChannelDetailsModal, {
            channel: {
                _id: channelDetails?._id,
                name: channelDetails?.name,
                description: channelDetails?.description
            },
            members: channelDetails?.members
        });
    }

    useEffect(() => {
        if (!socket) return;

        const handleTypingStart = (user) => {
            console.log("TYPING", user);
            setTypingUsers((prev) => [...prev, user]);
        };

        const handleTypingStop = (user) => {
            setTypingUsers((prev) =>
                prev.filter((u) => u.clerkId !== user.clerkId)
            );
        };

        socket.on("typing:started", handleTypingStart);
        socket.on("typing:stop", handleTypingStop);

        return () => {
            socket.off("typing:started", handleTypingStart);
            socket.off("typing:stop", handleTypingStop);
        };
    }, []);


    return (
        <div className='absolute w-full top-0 left-0 border-b border-bg-light bg-bg-grey px-4 py-5 flex items-center justify-between z-20'>
            <button onClick={handleModal} className='flex items-center gap-4'>
                <Hash className='text-primary-light' size={24} />
                <div className='flex flex-col items-start'>
                    <h5 className='text-lg'>
                        {channelDetails?.name}
                    </h5>

                    {
                        typingUsers.length > 0 && (
                            <p className='text-sm text-status-success'>
                                {typingUsers.map(u => u.name).join(", ")}{" "}
                                {typingUsers.length === 1 ? "is typing..." : "are typing..."}
                            </p>
                        )
                    }

                </div>
            </button>
        </div>
    )
}
