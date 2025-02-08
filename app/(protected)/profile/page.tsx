'use client'

import UiAvatarProfile from "@/components/ui/avatar-profile"
import { useCurrentUser } from "@/lib/hooks"
import { ChevronRight, DumbbellIcon, LockIcon, LogOutIcon, MessageCircleQuestionIcon, SettingsIcon, User2Icon, Wallet2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const links = [
    {
        href: "/profile/user",
        label: "Profile",
        icon: User2Icon
    },
    {
        href: "/profile/sport",
        label: "Sport",
        icon: DumbbellIcon
    },
    {
        href: "/profile/payments",
        label: "Payments",
        icon: Wallet2Icon
    },
    {
        href: "/profile/privacy",
        label: "Privacy Policy",
        icon: LockIcon
    },
    {
        href: "/profile/settings",
        label: "Settings",
        icon: SettingsIcon
    },
    {
        href: "/profile/help",
        label: "Help",
        icon: MessageCircleQuestionIcon
    },
]

const ProfilePage = () => {
    const user = useCurrentUser();
    return <article className="lg:hidden w-full flex flex-col justify-start items-center py-4 px-8">
        <div className="grid gap-2 items-center">
            <h2 className="text-center text-primary text-xl font-semibold">My Profile</h2>
            <div className="w-full flex justify-center items-center">
                <UiAvatarProfile className="size-32" isEdittable />
            </div>
            <h1 className="text-center text-xl font-bold">{user?.name}</h1>
        </div>
        <ul className="w-full space-y-4 mt-4">
            {links.map((link) => {
                return (
                    <li className="w-full" key={link.href}>
                        <Link href={link.href} className="w-full flex gap-2 justify-between items-center">
                            <div className="flex-1 gap-4 flex justify-start items-center">
                                <div className="size-10 rounded-full bg-primary/40 relative p-2">
                                    <link.icon className="size-full text-primary" />
                                </div>
                                <h4 className="text-lg font-semibold">{link.label}</h4>
                            </div>
                            <ChevronRight className="size-8 text-primary" />
                        </Link>
                    </li>
                )
            })}
            <li onClick={() => {
                signOut({ redirect: true, redirectTo: "/auth/sign-in" });
            }} className="w-full flex gap-2 justify-between items-center">
                <div className="flex-1 gap-4 flex justify-start items-center">
                    <div className="size-10 rounded-full bg-primary/40 relative p-2">
                        <LogOutIcon className="size-full text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold">Log Out</h4>
                </div>
            </li>
        </ul>
    </article>
}

export default ProfilePage