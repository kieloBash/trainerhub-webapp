import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const ReportsPage = async () => {

    const role = await currentRole()
    if (role === "ADMIN") redirect("/reports/admin");

    return null
}

export default ReportsPage