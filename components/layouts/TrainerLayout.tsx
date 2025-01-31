'use client'
import { ILayoutProps } from '@/types/global'
import React, { useMemo } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from '../ui/sidebar'
import { BellIcon, HistoryIcon, MapPinCheckIcon, ScanQrCodeIcon, SettingsIcon, QrCodeIcon, LogOutIcon, HomeIcon, MessageCircle, DumbbellIcon, Calendar1Icon, User2Icon } from 'lucide-react'
import { APP_NAME, cn } from '@/lib/utils'
import { useCurrentUser } from '@/lib/hooks'
import { NavUser } from '../ui/nav-user'
import { NavLinks } from '../ui/nav-links'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const TrainerLayout = ({ children }: ILayoutProps) => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const { isMobile } = useSidebar()

    const routes = useMemo(() => {
        return [
            {
                title: "Home",
                url: "/dashboard/trainer",
                icon: HomeIcon,
                isActive: pathname.includes("/dashboard"),
                items: [],
            },
            {
                title: "Messages",
                url: "/messages/trainer",
                icon: MessageCircle,
                isActive: pathname.includes("/messages"),
                items: [],
            },
            {
                title: "Profile",
                url: "/profile/trainer",
                icon: User2Icon,
                isActive: pathname.includes("/profile"),
                items: [],
            },
            {
                title: "Appointments",
                url: "/appointments/trainer",
                icon: Calendar1Icon,
                isActive: pathname.includes("/appointments"),
                items: [],
            },
        ]
    }, [pathname])

    if (!user) return null;

    return (
        <>
            {isMobile ? (
                <div className='relative w-full h-full'>
                    <div className="w-full h-full pb-20">
                        {children}
                    </div>
                    <div className="w-full h-20 fixed bottom-0 left-0 bg-sidebar border-t px-6 py-2 grid grid-cols-4 gap-2">
                        {routes.map((r) => {
                            return (
                                <Link href={r.url} key={r.title} className='w-full'>
                                    <button type='button' className={cn('w-full h-full p-4 border rounded-md flex justify-center items-center transition-colors', r.isActive ? "text-primary-foreground bg-primary" : "text-primary")}>
                                        <r.icon className='size-6' />
                                        {/* <span className="text-xs">{r.title}</span> */}
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ) : <>
                <Sidebar variant="inset">
                    <SidebarHeader>
                        <h2 className="flex gap-0 justify-start items-center font-bold text-4xl">
                            <span className="text-primary">Train</span><span className="">Hub</span>
                        </h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <NavLinks items={routes} />
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip={"logout"} isActive={false} onClick={() => {
                                    signOut({ redirect: true, redirectTo: "/" })
                                }}>
                                    <LogOutIcon />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        {/* <NavUser user={user as any} /> */}
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <SidebarTrigger className="lg:hidden fixed top-4 right-4" />
                    {children}
                </SidebarInset>
            </>}
        </>
    )
}

export default TrainerLayout