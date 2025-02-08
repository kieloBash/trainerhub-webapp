import { currentUser } from '@/lib/auth';
import { getTraineeById } from '@/lib/user';
import React from 'react'
import UserForm from './form';
import UiBackButton from '@/components/ui-project/back-btn';

const ProfileUserPage = async () => {
    const user = await currentUser();
    const profile = await getTraineeById(user?.id ?? "");

    if (!profile) return null;
    return (
        <article className='size-full relative py-4 px-8'>
            <div className="w-full flex justify-start items-center">
                <UiBackButton />
            </div>
            <UserForm data={profile as any} />
        </article>
    )
}

export default ProfileUserPage;