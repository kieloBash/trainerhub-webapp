'use client'
import { useCurrentUser } from '@/lib/hooks'
import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { cn } from '@/lib/utils'
import { PenIcon } from 'lucide-react'
import { CldUploadButton } from 'next-cloudinary'
import { updateProfileUser } from '@/lib/user'
import { useQueryClient } from '@tanstack/react-query'

const UiAvatarProfile = ({ className, isEdittable = false }: { className?: string, isEdittable?: boolean }) => {
    const user = useCurrentUser();

    const handleUpload = async (data: any) => {
        await updateProfileUser(data.info.secure_url, user?.id ?? "")
            .then((res) => {
                window.location.reload();
            })
    }

    return (
        <div className={cn(className, "relative")}>
            <Avatar className={className}>
                <AvatarImage src={user?.image ?? ""} alt={`@${user?.name}`} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEdittable && (
                <CldUploadButton
                    options={{ maxFiles: 1, clientAllowedFormats: ["png", "jpeg"] }}
                    onSuccess={handleUpload}
                    uploadPreset={"sandbox"}
                    className={"rounded-full size-8 bg-primary absolute bottom-0 right-0 border-2 border-white p-2"}
                >
                    <PenIcon className='text-primary-foreground size-full' />
                </CldUploadButton>
                // <button type='button' className="rounded-full size-8 bg-primary absolute bottom-0 right-0 border border-white p-2">
                //     <PenIcon className='text-primary-foreground size-full' />
                // </button>
            )}
        </div>
    )
}

export default UiAvatarProfile