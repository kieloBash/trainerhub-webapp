'use client'
import React from 'react'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IProps {
    id: string;
    className?: string;
    isFavorited?: boolean
}

const UiHeartButton = ({ id, className, isFavorited = false }: IProps) => {
    const CLASSNAME = cn('rounded-full size-10 p-1', className);
    const handleFavorite = () => {

    }

    return (
        <Button
            variant={isFavorited ? "outline" : "default"}
            type='button'
            onClick={handleFavorite}
            className={CLASSNAME}
        >
            <HeartIcon className={cn('size-full', isFavorited ? "fill-red-500 text-red-500 border-red-500" : "fill-white text-white border-white")} />
        </Button>
    )
}

export default UiHeartButton