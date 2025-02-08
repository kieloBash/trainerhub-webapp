'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

const UiBackButton = () => {
    const router = useRouter();
    return (
        <Button variant={"default"} type='button' onClick={() => router.back()} className='rounded-full size-10 p-1'>
            <ChevronLeft className='w-8 h-8' />
        </Button>
    )
}

export default UiBackButton