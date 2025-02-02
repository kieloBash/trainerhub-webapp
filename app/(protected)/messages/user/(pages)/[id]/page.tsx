'use client'
import { Button } from '@/components/ui/button'
import { IPageProps } from '@/types/global'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import FormMessage from './components/form-message'
import DisplayMessages from './components/display-messages'
import { useRouter } from 'next/navigation'

const UserMessagesIDPage = (props: IPageProps) => {
    console.log(props)
    const router = useRouter();

    //TODO: fetch user details by id BACKEND

    return (
        <article className="w-full h-full">
            <div className="w-full h-20 bg-primary flex justify-between items-center p-4">
                <div className="flex justify-center items-center gap-2 text-primary-foreground">
                    <Button variant={"ghost"} size={"icon"} onClick={() => { router.back() }}><ChevronLeft /></Button>
                    <h1 className="text-lg font-bold">Cocoy Aquino</h1>
                </div>
                <Button size={"sm"} variant={"outline"}>View Profile</Button>
            </div>
            <DisplayMessages />
            <FormMessage />
        </article>
    )
}

export default UserMessagesIDPage