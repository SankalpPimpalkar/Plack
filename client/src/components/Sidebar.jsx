import { useState } from 'react';
import { Globe, Search, X } from 'lucide-react';
import ActivityBar from './ActivityBar';
import Channel from './ui/Channel';
import { useEffect } from 'react';
import { getAvailableChannels, getUserChannels } from '../lib/api';
import { socket } from '../lib/socket';
import GlobalChannel from './ui/GlobalChannel';

export default function Sidebar() {

    const [isGlobalChannelsOpen, setIsGlobalChannelsOpen] = useState(false);
    const [userChannels, setUserChannels] = useState([])
    const [globalChannels, setGlobalChannels] = useState([])

    useEffect(() => {
        (async () => {
            const response = await getUserChannels()
            setUserChannels(response.channels)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const response = await getAvailableChannels()
            setGlobalChannels(response.channels)
        })()
    }, [])

    useEffect(() => {
        if (!socket) return
        if (userChannels.length > 0) {
            userChannels.map((channel) => {
                socket.emit("channel:join", channel._id)
            })
        }
    }, [socket, userChannels])

    return (
        <div className="w-full min-h-dvh select-none flex items-stretch bg-bg-grey text-amber-50 h-full col-span-2">
            <ActivityBar />

            <section className="w-full">
                <section className="w-full h-fit p-5 border-b border-bg-light">
                    <header className="w-full max-w-lg flex items-center justify-between gap-4">
                        {
                            !isGlobalChannelsOpen ? (
                                <h3 className="font-bold text-lg">My Channels</h3>
                            ) : (
                                <h3 className="font-bold text-lg">
                                    Global Channels
                                </h3>
                            )
                        }
                        {
                            isGlobalChannelsOpen ? (
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setIsGlobalChannelsOpen(false)}
                                />
                            ) :
                                (
                                    <Globe
                                        className="cursor-pointer"
                                        onClick={() => setIsGlobalChannelsOpen(true)}
                                    />
                                )
                        }
                    </header>
                </section>

                <section className="w-full h-fit flex flex-col items-start">
                    {
                        !isGlobalChannelsOpen && (
                            userChannels.length == 0 ? (
                                <p className='p-5 text-center text-xs text-muted'>
                                    Looks empty here! Join or create a channel to start chatting.
                                </p>
                            ) :
                                (
                                    userChannels.map((channel, idx) => (
                                        <Channel channelData={channel} key={idx} />
                                    ))
                                )
                        )
                    }
                    {
                        isGlobalChannelsOpen && (
                            globalChannels.length == 0 ? (
                                <p className='p-5 text-center text-xs text-muted'>
                                    No channels exist yet. Create the first one to start the conversation!
                                </p>
                            ) :
                                (
                                    globalChannels.map((channel, idx) => (
                                        <GlobalChannel channelData={channel} key={idx} />
                                    ))
                                )
                        )
                    }
                </section>
            </section>
        </div>
    );
}
