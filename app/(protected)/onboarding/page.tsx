import { currentUser } from '@/lib/auth';
import { getUserByIdAuth } from '@/lib/user';
import { redirect } from 'next/navigation';
import React from 'react'
import OnboardingForm from './form';

const OnboardingPage = async () => {
    const userId = await currentUser();
    const data = await getUserByIdAuth({ id: userId?.id, currentId: userId?.id });

    if (!data) return <article className="size-full flex justify-center items-center"><h1 className="">No user found!</h1></article>;
    if (data.isOnboarded) redirect("/dashboard");

    return (
        <article className="size-full flex flex-col justify-start items-center py-10 px-6 gap-8">
            <div className="">
                <h1 className="text-center text-xl text-primary font-semibold">Onboarding</h1>
                <h3 className="text-center text-xs">Get started and fill up all the necessary informations.</h3>
            </div>
            <OnboardingForm data={data as any} />
        </article>
    )
}

export default OnboardingPage