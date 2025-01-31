import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'

const TrainersPage = async () => {

    const role = await currentRole()
    if (role === "USER") redirect("/trainers/user");

    return null
}

export default TrainersPage