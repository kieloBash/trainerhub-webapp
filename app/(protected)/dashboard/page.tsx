import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {

    const role = await currentRole()
    if (role === "ADMIN") redirect("/dashboard/admin");
    if (role === "USER") redirect("/dashboard/user");
    if (role === "TRAINER") redirect("/dashboard/trainer");

    return null
}

export default DashboardPage