'use client'
import { useCurrentUser } from '@/lib/hooks';
import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { BellIcon, DumbbellIcon, HeartIcon, SettingsIcon } from 'lucide-react';
import UiSearch from '@/components/ui/search';
import AppointmentsSection from './components/appointments';


const TrainerDashboardPage = () => {
    const user = useCurrentUser();

    return (
        <div className="h-full w-full flex flex-col lg:hidden">
            <div className="w-full h-20 border-b flex justify-between items-center px-6">
                <div className="flex justify-start items-center gap-2">
                    <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "profile"} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between items-start gap-0">
                        <h2 className="text-primary text-sm">Hi, Welcome Back</h2>
                        <h1 className="text-xs font-medium">{user?.name}</h1>
                    </div>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <Button type='button' size={"icon"}><BellIcon /></Button>
                    <Button type='button' size={"icon"} variant={"outline"}><SettingsIcon /></Button>
                </div>
            </div>
            <div className="w-full flex-1 flex flex-col justify-start items-start gap-4 pt-6">
                <div className="px-6 w-full flex justify-center items-center gap-4">
                    <UiSearch handleResetPage={() => { }} className='w-fit flex-1 border-primary text-primary' />
                </div>
                <AppointmentsSection />
            </div>
        </div>
    )
}

export default TrainerDashboardPage