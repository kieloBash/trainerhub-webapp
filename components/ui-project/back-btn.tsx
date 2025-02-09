'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const UiBackButton = ({ className }: { className?: string }) => {
    const router = useRouter();
    const CLASSNAME = cn('rounded-full size-10 p-1', className);
    return (
        <Button variant={"default"} type='button' onClick={() => router.back()} className={CLASSNAME}>
            <ChevronLeft className='size-full' />
        </Button>
    )
}

export default UiBackButton