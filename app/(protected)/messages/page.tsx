import { currentRole } from '@/lib/auth'
import { redirect } from 'next/navigation'

const MessagesPage = async () => {

    const role = await currentRole()
    if (role === "USER") redirect("/messages/user");
    if (role === "TRAINER") redirect("/messages/trainer");

    return null
}

export default MessagesPage