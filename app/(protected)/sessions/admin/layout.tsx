import React from 'react'
import RoleGateLayout from '@/components/layouts/RoleGateLayout'
import { ILayoutProps } from '@/types/global'
import { UserRole } from '@prisma/client'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';
import AdminHeaderLayout from '@/components/layouts/AdminHeader';

const TITLE = 'Sessions';
const DESCRIPTION = 'View and manage sessions in the system';
const LIST = [
    {
        type: "page",
        href: "",
        label: "Sessions"
    },
]

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};


const Layout = ({ children }: ILayoutProps) => {
    return (
        <RoleGateLayout roles={[UserRole.ADMIN]}>
            <AdminHeaderLayout list={LIST} title={TITLE} description={DESCRIPTION}>
                {children}
            </AdminHeaderLayout>
        </RoleGateLayout>
    )
}

export default Layout