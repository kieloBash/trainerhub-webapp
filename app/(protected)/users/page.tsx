import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const UsersPage = async () => {

    const role = await currentRole()
    if (role === "ADMIN") redirect("/users/admin");

    return null
}

export default UsersPage