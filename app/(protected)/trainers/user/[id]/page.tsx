import UiBackButton from '@/components/ui-project/back-btn'
import UiHeartButton from '@/components/ui-project/heart-btn'
import UiTrainerLevelDisplay from '@/components/ui-project/level-display'
import UiWorkDaysDisplay from '@/components/ui-project/workdays-display'
import UiAvatarProfileCustom from '@/components/ui/avatar-profile-custom'
import { Separator } from '@/components/ui/separator'
import { getTrainerById } from '@/lib/user'
import { IPageProps } from '@/types/global'
import React from 'react'
import BookButton from './components/book-btn'

const TrainerPage = async (props: IPageProps) => {
    const trainer = await getTrainerById(props.params.id);

    if (!trainer || !trainer?.trainer) return (
        <div className="w-full h-full flex justify-center items-center">
            <span className="">
                No Trainer Found.
            </span>
        </div>
    )

    return (
        <article className="w-full h-full flex flex-col p-4">
            <div className="w-full flex justify-between items-center">
                <UiBackButton className='size-8' />
                <div className="flex-1 justify-center items-center flex">
                    <h3 className="font-semibold">
                        Profile
                    </h3>
                </div>
                <UiHeartButton id={trainer?.id ?? ""} className='size-8' />
            </div>
            <div className="mt-4 w-full flex flex-col gap-2 justify-start items-center">
                <UiAvatarProfileCustom
                    image={trainer.image}
                    name={trainer.name}
                    className='size-32 border-4 border-primary rounded-full p-0.5'
                />
                <h1 className="text-xl text-primary font-bold text-center">
                    {trainer.name}
                </h1>
                <p className="w-full max-w-xs text-muted-foreground text-center font-semibold">
                    {trainer.trainer?.bio}
                </p>
                <span className="text-center text-muted-foreground/80">
                    {trainer.trainer?.location} | {trainer.trainer?.gender}
                </span>
                <UiWorkDaysDisplay
                    workDays={trainer.trainer.workDays as any[]}
                    startTime={trainer.trainer.startTime}
                    endTime={trainer.trainer.endTime}
                />
            </div>
            <div className="mx-auto grid grid-cols-3 items-center gap-2 w-full max-w-xs py-4 mt-4">
                <div className="flex flex-col gap-0 justify-center items-center">
                    <h4 className="text-center font-bold">{trainer.trainer?.yearsOfExperience ?? 0} yrs.</h4>
                    <span className="text-center text-xs text-muted-foreground">Experience</span>
                </div>
                <div className="flex flex-col gap-0 justify-center items-center">
                    <UiTrainerLevelDisplay level={trainer.trainer?.level} />
                    <span className="text-center text-xs text-muted-foreground">Level</span>
                </div>
                <div className="flex flex-col gap-0 justify-center items-center">
                    <h4 className="text-center font-bold">{trainer.trainer?.rating ?? 0}</h4>
                    <span className="text-center text-xs text-muted-foreground">Rating</span>
                </div>
            </div>
            <Separator className='w-full my-3' />
            <div className="w-full flex gap-2 mx-auto max-w-sm py-4 justify-center items-center">
                <h2 className="text-primary text-2xl font-bold">200 php.</h2>
                <div className="flex-1">
                    <BookButton id={trainer.id} />
                </div>
            </div>
            <ul className="grid w-full gap-3">
                <li className="flex flex-col w-full gap-0 text-sm">
                    <h4 className="text-left w-full text-primary font-semibold">Sports</h4>
                    <p className="">{trainer.trainer?.sports?.join(", ")}</p>
                </li>
                <li className="flex flex-col w-full gap-0 text-sm">
                    <h4 className="text-left w-full text-primary font-semibold">Focus</h4>
                    <p className="">{trainer.trainer.focus}</p>
                </li>
                <li className="flex flex-col w-full gap-0 text-sm">
                    <h4 className="text-left w-full text-primary font-semibold">Career Path</h4>
                    <p className="">{trainer.trainer.careerPath}</p>
                </li>
                <li className="flex flex-col w-full gap-0 text-sm">
                    <h4 className="text-left w-full text-primary font-semibold">Higlights</h4>
                    <p className="">{trainer.trainer.highlights}</p>
                </li>
            </ul>
        </article>
    )
}

export default TrainerPage