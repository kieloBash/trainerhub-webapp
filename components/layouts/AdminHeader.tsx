"use client"
import { ILayoutProps } from '@/types/global'
import React from 'react'

import { useCurrentUser } from '@/lib/hooks';
import { useSidebar } from '../ui/sidebar';
import { Button } from '../ui/button';
import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    UserCog2Icon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react';

type IProps = ILayoutProps & {
    title: string;
    description: string;
    list: { type: string, href: string, label: string }[];
}
const AdminHeaderLayout = ({ children, list, title, description }: IProps) => {
    const user = useCurrentUser();
    const { isMobile } = useSidebar()

    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full h-20 border-b flex justify-between items-center px-10">
                <div className="grid">
                    <h1 className="lg:text-2xl text-base font-bold text-primary">{title}</h1>
                    <p className='lg:text-sm text-xs text-muted-foreground'>{description}</p>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <Link href={"/settings"}>
                        <Button size={"icon"} className='h-10 w-10' variant={"default"} type='button'><SettingsIcon /></Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type='button'
                                className="h-10 hover:bg-muted transition-colors flex px-2 py-1 rounded-lg gap-2 justify-center items-center border"
                            >
                                <Avatar className="h-7 w-7 rounded-lg">
                                    <AvatarImage src={user?.image ?? ""} alt={user?.name || "user_name"} />
                                    <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight gap-0">
                                    <span className="truncate text-primary font-semibold text-xs">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={"bottom"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user?.image ?? ""} alt={user?.name || "user_name"} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.name}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <UserCog2Icon />
                                    {user?.role}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                signOut({ redirect: true, redirectTo: "/auth/sign-in" })
                            }}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="w-full flex-1 p-4">{children}</div>
        </div>
    )
}

export default AdminHeaderLayout