import React from 'react'
import LogoutBtn from './ui/LogoutBtn'

export default function Sidebar() {
    return (
        <div className='w-full min-h-dvh bg-primary-light text-amber-50 h-full col-span-2'>
            Sidebar
            <LogoutBtn />
        </div>
    )
}
