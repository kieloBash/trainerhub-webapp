import { currentUser } from '@/lib/auth'
import { getUserByIdAuth } from '@/lib/user';
import { IPageProps } from '@/types/global'
import React from 'react'
import UserForm from './form';

const AdminEditUserPage = async ({ params }: IPageProps) => {
    const userId = await currentUser();
    const data = await getUserByIdAuth({ id: params.id, currentId: userId?.id });

    if (!data) return <article className="size-full flex justify-center items-center"><h1 className="">No user found!</h1></article>;

    return <UserForm data={data as any} />
}

export default AdminEditUserPage