import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const SessionsPage = async () => {

    const role = await currentRole()
    if (role === "ADMIN") redirect("/sessions/admin");

    return null
}

export default SessionsPage