'use client'
import { Card } from '@/components/ui/card';
import useUserTrainers from '@/hooks/user/use-trainers'
import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Calendar1Icon, CalendarClockIcon, HeartIcon, MessageCircleQuestionIcon, StarIcon } from 'lucide-react';
import UiDataLoader from '@/components/ui/data-loader';
import Link from 'next/link';

const TrainersSection = () => {
    const data = useUserTrainers({});

    return (
        <div className='px-4 w-full'>
            <UiDataLoader
                isLoading={data?.isLoading || data.isFetching}
                length={data?.payload?.length}
            >
                <ul className="w-full space-y-2">
                    {
                        data?.payload?.map((d) => {
                            return (
                                <li className="w-full" key={d.id}>
                                    <Card className='p-2 flex flex-row gap-2 justify-between items-center'>
                                        <Avatar className="size-20 aspect-square rounded-lg">
                                            <AvatarImage src={d?.image ?? ""} alt={d?.name ?? "profile"} />
                                            <AvatarFallback className="rounded-lg">{d?.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex justify-between items-center w-full">
                                                <div className="flex flex-col gap-0">
                                                    <h1 className="text-primary font-medium">{d.name}</h1>
                                                    <h1 className="text-sm">{}</h1>
                                                </div>
                                                <Button type='button' size={"icon"} variant={"outline"}><HeartIcon /></Button>
                                            </div>
                                            <div className="w-full flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-2">
                                                    <div className="text-sm flex text-primary justify-center items-center gap-1">
                                                        <StarIcon className={"size-3.5"} />
                                                        <span>4.6</span>
                                                    </div>
                                                    <div className="text-sm flex text-primary justify-center items-center gap-1">
                                                        <Calendar1Icon className={"size-3.5"} />
                                                        <span>60</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-center gap-2">
                                                    <Link href={`/trainers/user/${d.id}`}>
                                                        <Button type='button' size={"sm"} variant={"default"}>
                                                            <CalendarClockIcon />
                                                            <span>Book now!</span>
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </li>
                            )
                        })
                    }
                </ul>
            </UiDataLoader>
        </div >
    )
}

export default TrainersSection