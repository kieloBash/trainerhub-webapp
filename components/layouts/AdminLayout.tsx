'use client'
import { ILayoutProps } from '@/types/global'
import React, { useMemo } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { CalendarCheck2, DumbbellIcon, FlagIcon, HistoryIcon, LayoutDashboardIcon, LogOutIcon, MessageCircleMore, SettingsIcon, User2Icon } from 'lucide-react'
import { APP_NAME } from '@/lib/utils'
import { useCurrentUser } from '@/lib/hooks'
import { NavUser } from '../ui/nav-user'
import { NavLinks } from '../ui/nav-links'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const AdminLayout = ({ children }: ILayoutProps) => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const routes = useMemo(() => {
        return [
            {
                title: "Dashboard",
                url: "/dashboard/admin",
                icon: LayoutDashboardIcon,
                isActive: pathname.includes("/dashboard"),
                items: [],
            },
            {
                title: "Users",
                url: "/users/admin",
                icon: User2Icon,
                isActive: pathname.includes("/users"),
                items: [],
            },
            {
                title: "Sessions",
                url: "/sessions/admin",
                icon: CalendarCheck2,
                isActive: pathname.includes("/sessions"),
                items: [],
            },
            {
                title: "Reports",
                url: "/reports/admin",
                icon: FlagIcon,
                isActive: pathname.includes("/reports"),
                items: [],
            },
        ]
    }, [pathname])

    if (!user) return null;

    return (
        <SidebarProvider>
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
        </SidebarProvider>
    )
}

export default AdminLayout