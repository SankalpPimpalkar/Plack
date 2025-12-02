import { Hash } from 'lucide-react'
import React from 'react'
import { joinChannel } from '../../lib/api'
import { useNavigate } from 'react-router-dom'

export default function GlobalChannel({ channelData }) {

    const navigate = useNavigate()

    async function handleJoinChannel() {
        await joinChannel({ channelId: channelData._id })
        navigate("/channels")
        window.location.reload()
    }

    return (
        <div className='w-full flex items-center justify-between p-5'>
            <div className='flex items-center gap-5'>
                <Hash className='text-primary-light' size={24} />

                <div>
                    <h5 className='font-semibold'>
                        {channelData.name}
                    </h5>
                    <p className='text-sm font-medium text-muted'>
                        {channelData.members.length} {channelData.members.length > 1 ? "members" : "member"}
                    </p>
                </div>
            </div>

            <button onClick={handleJoinChannel} className='bg-primary-light text-amber-50 px-4 py-2 text-xs rounded'>
                Join
            </button>
        </div>
    )
}
