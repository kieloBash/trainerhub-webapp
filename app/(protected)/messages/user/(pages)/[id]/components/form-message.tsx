import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperclipIcon, SendHorizonalIcon } from 'lucide-react'
import React from 'react'


const FormMessage = () => {
    return (
        <form className="w-full h-16 px-4 py-2 flex justify-between items-center gap-2">
            <div className="flex justify-center items-center gap-2">
                <Button variant={"outline"} size={"icon"}><PaperclipIcon /></Button>
            </div>
            <Input placeholder='Write a message...' className='flex-1' />
            <Button variant={"default"} size={"icon"}><SendHorizonalIcon /></Button>
        </form>
    )
}

export default FormMessage