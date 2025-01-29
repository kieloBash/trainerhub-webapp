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
import { Calendar1Icon, HeartIcon, MessageCircleQuestionIcon, StarIcon } from 'lucide-react';
import UiDataLoader from '@/components/ui/data-loader';

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
                                            <div className="flex-1 flex flex-col gap-0">
                                                <h1 className="text-primary font-medium">{d.name}</h1>
                                                <h1 className="text-sm">{d.sport?.name}</h1>
                                            </div>
                                            <div className="w-full flex justify-between items-center">
                                                <div className="flex justify-start items-center gap-2">
                                                    <div className="h-9 px-2 py-1 flex justify-center items-center text-primary gap-2 border rounded-lg">
                                                        <StarIcon className={"size-4"} />
                                                        <span>4.6</span>
                                                    </div>
                                                    <div className="h-9 px-2 py-1 flex justify-center items-center text-primary gap-2 border rounded-lg">
                                                        <Calendar1Icon className={"size-4"} />
                                                        <span>60</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-center gap-2">
                                                    <Button type='button' size={"icon"} variant={"outline"}><MessageCircleQuestionIcon /></Button>
                                                    <Button type='button' size={"icon"} variant={"outline"}><HeartIcon /></Button>
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