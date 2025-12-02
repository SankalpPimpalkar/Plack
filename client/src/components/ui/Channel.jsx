import { Hash } from 'lucide-react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Channel({ channelData }) {

    const location = useLocation()

    return (
        <NavLink to={`/channels/${channelData._id}`} className={`flex items-center gap-5 w-full px-5 py-5 hover:bg-bg-light ${location.pathname.includes(channelData._id) && "bg-primary-dark"}`}>
            <Hash className='text-primary-light' size={24} />

            <div>
                <h5 className='font-semibold'>
                    {channelData.name}
                </h5>
                <p className='text-sm font-medium text-muted'>
                    {channelData.members.length} {channelData.members.length > 1 ? "members" : "member"}
                </p>
            </div>
        </NavLink>
    )
}
