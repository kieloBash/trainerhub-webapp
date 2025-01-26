'use client'
import {
    Eye,
    HistoryIcon,
    LogOutIcon,
    PlusIcon,
    Settings2Icon,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { signOut } from "next-auth/react"

type SelectedType = "" | "";

export default function UiAdminUtils() {
    const [selected, setSelected] = useState<SelectedType>("");
    return (
        <>
            <div className="fixed lg:bottom-10 bottom-36 mb-2 right-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings2Icon className="absolute h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Toggle Admin Utils</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Admin Utilities</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Users />
                                    <span>Account</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => { }}>
                                        <div className="grid gap-1">
                                            <div className="flex gap-2">
                                                <UserPlus />
                                                <span>Create admin account</span>
                                            </div>
                                            <div className="grid text-xs">
                                                <span>Email: admin@gmail.com</span>
                                                <span>Pass: User1234!</span>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                            signOut({ redirect: true, redirectTo: "/" })
                        }}>
                            <LogOutIcon />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
