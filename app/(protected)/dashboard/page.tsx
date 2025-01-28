import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {

    const role = await currentRole()
    if (role === "ADMIN") redirect("/dashboard/admin");

    return null
}

export default DashboardPage