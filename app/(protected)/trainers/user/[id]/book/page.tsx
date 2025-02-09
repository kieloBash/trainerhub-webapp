import UiBackButton from '@/components/ui-project/back-btn';
import { getTrainerById } from '@/lib/user';
import { IPageProps } from '@/types/global'
import React from 'react'
import AppointmentsSection from './components/appointments';

const page = async (props: IPageProps) => {
    const trainer = await getTrainerById(props.params.id);

    if (!trainer || !trainer?.trainer) return (
        <div className="w-full h-full flex justify-center items-center">
            <span className="">
                No Trainer Found.
            </span>
        </div>
    )

    console.log(trainer);

    return (
        <article className="w-full h-full flex flex-col gap-2">
            <div className="p-4 w-full flex justify-between items-center">
                <UiBackButton className='size-8' />
                <div className="flex-1 justify-end items-center flex text-right text-primary">
                    <h3 className="font-semibold text-lg">
                        {trainer.name}
                    </h3>
                </div>
            </div>
            <AppointmentsSection
                startTime={trainer.trainer.startTime ?? ""}
                endTime={trainer.trainer.endTime ?? ""}
            />
        </article>
    )
}

export default page