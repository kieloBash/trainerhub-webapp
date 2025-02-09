'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const BookButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/trainers/user/${id}/book`} className='w-full'>
            <Button type='button' size={"lg"} className='w-full'>Book a Training</Button>
        </Link>
    )
}

export default BookButton