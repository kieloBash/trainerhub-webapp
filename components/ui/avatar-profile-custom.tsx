'use client'
import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { cn } from '@/lib/utils'

interface IProps { className?: string; image?: string | null; name: string }
const UiAvatarProfileCustom = (
    { className, image, name }: IProps
) => {

    return (
        <div className={cn(className, "relative")}>
            <Avatar className={"size-full"}>
                <AvatarImage src={image ?? ""} alt={`@${name}`} />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UiAvatarProfileCustom