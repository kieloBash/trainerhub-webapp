import { getUserById } from '@/lib/user'
import { IPageProps } from '@/types/global'
import React from 'react'

const TrainerPage = async (props: IPageProps) => {
    console.log(props)
    const trainer = await getUserById(props.params.id);
    console.log(trainer)
    return (
        <div>TrainerPage</div>
    )
}

export default TrainerPage