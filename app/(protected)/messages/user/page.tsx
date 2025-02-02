'use client'
import { Button } from '@/components/ui/button'
import UiSearch from '@/components/ui/search'
import { PenBoxIcon } from 'lucide-react'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'

const UserMessagesPage = () => {
    const router = useRouter();

    function handleSelectMessage(id: string) {
        router.push(`/messages/user/${id}`)
    }

    return (
        <article className="w-full h-full">
            <div className="w-full p-4 flex flex-col justify-center items-center gap-2 bg-primary">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary-foreground">Messages</h1>
                </div>
                <UiSearch handleResetPage={() => { }} placeholder='Search messages...' className='' />
            </div>
            <ul className="w-full">
                <li className="w-full h-20 p-4 flex justify-start items-center" onClick={() => { handleSelectMessage("123") }}>
                    <div className="p-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full">
                            <div className="w-full">
                                <h2 className="text-base font-bold">Cocoy Aquino</h2>
                            </div>
                            <div className="w-full flex gap-1">
                                <p className="text-sm">Hello world!</p>
                                <span className="text-sm text-muted-foreground">- 1m</span>
                            </div>
                        </div>
                        <div className="size-3 bg-primary rounded-full"></div>
                    </div>
                </li>
            </ul>
        </article>
    )
}

export default UserMessagesPage